import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Layers3,
  LogOut,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import type { Product, User } from "../../../packages/shared/src/types";
import { api } from "./lib/api";
import { DEFAULT_PRODUCTS } from "./lib/defaultProducts";
import { Catalogue } from "./pages/Catalogue";
import { Workspace } from "./pages/Workspace";
import { AuthModal } from "./components/AuthModal";
import { MaterialList } from "./components/MaterialList";
import { Modal } from "./components/UI";
export default function App() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS),
    [user, setUser] = useState<User | null>(null),
    [demoAuth, setDemoAuth] = useState(true),
    [view, setView] = useState(
      location.hash === "#workspace" ? "workspace" : "catalogue",
    ),
    [auth, setAuth] = useState(false),
    [cartOpen, setCartOpen] = useState(false),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [info, setInfo] = useState(false),
    [toast, setToast] = useState("");
  const [cart, setCartState] = useState<Record<string, number>>(() => {
    try {
      const parsed = JSON.parse(
        localStorage.getItem("cmemp-material-list") || "{}",
      );
      return Object.fromEntries(
        Object.entries(parsed).filter(
          ([, v]) =>
            typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 100000,
        ),
      ) as Record<string, number>;
    } catch {
      return {};
    }
  });
  function setCart(value: Record<string, number>) {
    setCartState(value);
    try {
      localStorage.setItem("cmemp-material-list", JSON.stringify(value));
    } catch {
      /* Storage is optional; server records remain persistent. */
    }
  }
  async function refreshUser() {
    try {
      const data = await api<{ user: User | null; demoAuth: boolean }>(
        "/auth/me",
      );
      setUser(data.user);
      setDemoAuth(data.demoAuth);
      if (data.user) {
        localStorage.removeItem("cmemp-demo-user");
      }
    } catch {
      try {
        const stored = localStorage.getItem("cmemp-demo-user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setDemoAuth(true);
    }
  }
  async function refreshProducts() {
    try {
      const data = await api<Product[]>("/products");
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    } catch {
      // In standalone frontend deployments (e.g. Vercel preview), fallback to verified default catalogue
      setProducts(DEFAULT_PRODUCTS);
    }
  }
  async function init() {
    setLoading(true);
    setError("");
    try {
      await Promise.allSettled([refreshUser(), refreshProducts()]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void init();
    const handler = () =>
      setView(location.hash === "#workspace" ? "workspace" : "catalogue");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  function navigate(next: string) {
    location.hash = next === "workspace" ? "workspace" : "materials";
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function openWorkspace() {
    navigate("workspace");
    if (!user) setAuth(true);
  }
  async function logout() {
    try {
      await api("/auth/logout", "POST");
    } catch {
      /* offline */
    }
    localStorage.removeItem("cmemp-demo-user");
    setUser(null);
    navigate("catalogue");
  }
  return (
    <>
      <div className="utility-bar">
        <span>BUILT FOR THE WAY INDIA BUILDS</span>
        <span>VERIFIED PROCUREMENT PLATFORM</span>
      </div>
      <header className="site-header">
        <button
          className="logo"
          onClick={() => navigate("catalogue")}
          aria-label="CMEMP home"
        >
          <span className="logo-mark">
            <Layers3 size={25} />
          </span>
          <span>
            CMEMP<small>MATERIALS & PROCUREMENT</small>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button
            className={view === "catalogue" ? "active" : ""}
            onClick={() => navigate("catalogue")}
          >
            Materials
          </button>
          <button
            className={view === "workspace" ? "active" : ""}
            onClick={openWorkspace}
          >
            {user?.role === "admin" ? "Operations" : "My workspace"}
          </button>
          <button onClick={() => setInfo(true)}>
            About the MVP <ArrowUpRight size={13} />
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Material list, ${Object.keys(cart).length} materials`}
          >
            <ShoppingBag size={19} />
            <span>Material list</span>
            <b>{Object.keys(cart).length}</b>
          </button>
          {user ? (
            <>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <button
                className="icon-button"
                aria-label="Sign out"
                title="Sign out"
                onClick={() => void logout()}
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button className="login-button" onClick={() => setAuth(true)}>
              <UserRound size={17} />
              <span>Sign in</span>
            </button>
          )}
        </div>
      </header>
      <main>
        {error && products.length === 0 && (
          <div className="error" role="alert">
            Could not connect to the server: {error}{" "}
            <button className="text-button" onClick={() => void init()}>
              Retry
            </button>
          </div>
        )}
        {loading ? (
          <div className="loading">
            <Layers3 size={36} />
            <p>Preparing your material workspace…</p>
          </div>
        ) : view === "catalogue" ? (
          <Catalogue
            products={products}
            onAdd={(p) => {
              setCart({ ...cart, [p.id]: cart[p.id] || 1 });
              setToast(`${p.brand} material added to your list.`);
            }}
            cart={cart}
            onStart={openWorkspace}
          />
        ) : user ? (
          <Workspace
            key={user.id}
            user={user}
            products={products}
            onBrowse={() => navigate("catalogue")}
            onUserRefresh={refreshUser}
            onProductsRefresh={refreshProducts}
          />
        ) : (
          <section className="signin-page">
            <span className="eyebrow">YOUR PROCUREMENT, IN ONE PLACE</span>
            <h1>Your next project starts here.</h1>
            <p>
              Sign in to submit material requests, compare supplier quotes, and
              track your orders.
            </p>
            <button className="button primary" onClick={() => setAuth(true)}>
              Sign in to your workspace
            </button>
          </section>
        )}
      </main>
      <footer>
        <div className="footer-brand">
          <Layers3 size={24} />
          <strong>CMEMP</strong>
          <span>Better sourced. Better built.</span>
        </div>
        <p>Local MVP · Rates and supplier records are sample data.</p>
        <button className="text-button" onClick={() => setInfo(true)}>
          Scope & integration status <ArrowUpRight size={14} />
        </button>
      </footer>
      {auth && (
        <AuthModal
          demoAuth={demoAuth}
          onClose={() => setAuth(false)}
          onSuccess={async () => {
            await refreshUser();
            if (!cartOpen) navigate("workspace");
          }}
        />
      )}
      {cartOpen && !auth && (
        <MaterialList
          products={products}
          cart={cart}
          setCart={setCart}
          user={user}
          onClose={() => setCartOpen(false)}
          onLogin={() => setAuth(true)}
          onSubmitted={() => {
            setCartOpen(false);
            navigate("workspace");
            setToast(
              "Material request saved. You can track it in your workspace.",
            );
          }}
        />
      )}
      {info && (
        <Modal title="A working procurement MVP" onClose={() => setInfo(false)}>
          <p>
            This version covers the core journey from a material list to a
            delivered order.
          </p>
          <ul className="scope-list">
            <li>Search and compare material specifications.</li>
            <li>Save customer profiles and material requests.</li>
            <li>Publish and compare supplier quotations.</li>
            <li>Accept a quote once to create a confirmed order.</li>
            <li>Manage fulfilment, transport and supplier payment records.</li>
            <li>Print purchase orders and delivery challans.</li>
            <li>Receive in-app updates and earn points on delivery.</li>
          </ul>
          <div className="notice">
            Local OTP testing is {demoAuth ? "enabled" : "disabled"}. SMS,
            WhatsApp, email, maps and payment gateway integrations are not
            connected. No messages or money are sent.
          </div>
          <p className="muted">
            Supplier portals, attachment uploads, content management, service
            directories, automated follow-ups and reward redemption are future
            modules. See the project documentation for the full scope.
          </p>
        </Modal>
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
          <button
            className="icon-button"
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
