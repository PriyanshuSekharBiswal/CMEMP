/**
 * Construction Materials E-Commerce & Management Platform (CMEMP)
 * Main Application Engine
 * Includes:
 * 1. CMEMP-inspired 3D Isometric Crosshair Interactive Canvas
 * 2. Dynamic Catalogue & Multi-Faceted Filters
 * 3. Multi-Brand Comparative Quotation Engine
 * 4. Bill of Materials (BOM) & WhatsApp Quote Bridge
 * 5. Customer Dashboard & Real-Time Logistics Tracking
 * 6. Operations Hub (PO, Challan, Trucking & Supplier Matching)
 * 7. RFP 72-Feature Requirement Inspector
 */

import {
  MATERIALS_DATA,
  SUPPLIERS_DATA,
  WORKMEN_DIRECTORY,
  EXPERT_ADVISORS,
  INITIAL_ORDERS,
  COMPANY_CONFIG,
  ALL_120_RFP_CHECKLIST_ITEMS,
  BLOG_POSTS,
  FAQS_DATA
} from './data.js';

// Application State
const state = {
  activeView: 'storefront', // 'storefront' | 'comparison' | 'dashboard' | 'operations' | 'directory' | 'admin' | 'content' | 'audit'
  selectedCategory: 'ALL',
  selectedBrand: 'ALL',
  searchQuery: '',
  rfpSearchQuery: '',
  rfpModuleFilter: 'ALL',
  userPhone: '+91 89848 09002',
  isLoggedIn: true,
  bomList: [
    { material: MATERIALS_DATA[0], qty: 4, unit: "Tonne" }, // Tata Tiscon 550D
    { material: MATERIALS_DATA[3], qty: 150, unit: "50kg Bag" } // UltraTech Super
  ],
  activeComparisonCategory: 'Steel & Structural',
  activeOrder: INITIAL_ORDERS[0],
  loyaltyPoints: 1450,
  discounts: {
    'Steel & Structural': 3.5,
    'Cement & Concrete': 4.0,
    'Plumbing & Piping': 5.0
  }
};

/* ==========================================================================
   1. HERO CANVAS: ISOMETRIC CROSSHAIR & REBAR TURBINE MATH (CMEMP STYLE)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse / Crosshair Tracking Variables
  let mouseX = width * 0.65;
  let mouseY = height * 0.45;
  let targetAngle = Math.PI / 4;
  let currentAngleA = Math.PI / 4;
  let currentAngleB = Math.PI / 4;
  let rotationOffset = 0;
  let lastTime = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    const centerX = width >= 768 ? width * 0.62 : width * 0.5;
    const centerY = height * 0.48;
    targetAngle = Math.atan2(mouseY - centerY, mouseX - centerX);
  }, { passive: true });

  // 3D Isometric projection helper
  function projectPoint(radius, angle, zElevation, scaleY, shearX, centerX, centerY) {
    let px = radius * Math.cos(angle);
    let py = radius * Math.sin(angle);
    // Structural sag / curve distortion
    const curve = 28 * Math.pow(Math.max(0, radius / (width * 0.35)), 2);
    py *= scaleY;
    px += py * shearX;
    return {
      x: px + centerX,
      y: py + centerY - zElevation + curve
    };
  }

  function drawQuad(p1, p2, p3, p4, fillStyle, strokeStyle, lineWidth = 0.8) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function animate(now) {
    if (!lastTime) lastTime = now;
    const dt = Math.min(40, now - lastTime);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    const isDesktop = width >= 768;
    const centerX = isDesktop ? width * 0.62 : width * 0.5;
    const centerY = height * 0.48;
    const outerRadius = Math.min(width, height) * (isDesktop ? 0.44 : 0.38);
    const innerRadius = outerRadius * 0.42;

    // Continuous ambient slow rotation
    rotationOffset += 0.00015 * dt;
    rotationOffset %= Math.PI * 2;

    // Angular Lerp toward mouse crosshair angle
    let diffA = targetAngle - currentAngleA;
    while (diffA < -Math.PI) diffA += Math.PI * 2;
    while (diffA > Math.PI) diffA -= Math.PI * 2;
    currentAngleA += 0.06 * diffA;
    currentAngleA = (currentAngleA + Math.PI * 2) % (Math.PI * 2);

    let diffB = (targetAngle + Math.PI / 8) % (Math.PI * 2) - currentAngleB;
    while (diffB < -Math.PI) diffB += Math.PI * 2;
    while (diffB > Math.PI) diffB -= Math.PI * 2;
    currentAngleB += 0.06 * diffB;
    currentAngleB = (currentAngleB + Math.PI * 2) % (Math.PI * 2);

    const spreadAngle = (Math.PI / 180) * 55;

    // 1. Draw Architectural Rebar Grid / Foundation Base
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(1, 0.55);
    ctx.transform(1, -0.22, 0, 1, 0, 0);

    // Concentric blueprint guide rings
    ctx.strokeStyle = "rgba(245, 158, 11, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.5, 0, Math.PI * 2);
    ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Radial guide spokes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * outerRadius * 1.25, Math.sin(a) * outerRadius * 1.25);
    }
    ctx.stroke();
    ctx.restore();

    // 2. Inner Ring: 48 Structural Rebar / Turbine Fins
    const innerFins = Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48 * Math.PI * 2 + rotationOffset) % (Math.PI * 2);
      return { index: i, angle, sinVal: Math.sin(angle) };
    });
    // Depth sort
    innerFins.sort((a, b) => a.sinVal - b.sinVal);

    innerFins.forEach(({ angle }) => {
      let angDiff = Math.abs(angle - currentAngleB);
      if (angDiff > Math.PI) angDiff = Math.PI * 2 - angDiff;

      // Gaussian bell-curve interaction towards cursor crosshair
      let lift = 0;
      if (angDiff < spreadAngle) {
        lift = Math.exp(-Math.pow((angDiff / spreadAngle) * 2, 2));
      }

      const scaleY = 0.55 - 0.08 * lift;
      const shearX = -0.22 + 0.08 * lift;
      const rInner = innerRadius * 0.45;
      const rOuter = innerRadius * 0.95 + outerRadius * 0.05 * lift;
      const elevation = 8 + 16 * lift;
      const angSpan = (Math.PI * 2) / 48 * 0.85;

      const p1 = projectPoint(rInner, angle, 0, scaleY, shearX, centerX, centerY);
      const p2 = projectPoint(rOuter, angle, 0, scaleY, shearX, centerX, centerY);
      const p3 = projectPoint(rOuter, angle + angSpan, elevation, scaleY, shearX, centerX, centerY);
      const p4 = projectPoint(rInner, angle + angSpan, elevation, scaleY, shearX, centerX, centerY);

      const alpha = Math.min(0.65, 0.08 + (Math.sin(angle) + 1) * 0.15 + 0.35 * lift);
      const strokeColor = lift > 0.4 ? `rgba(245, 158, 11, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.4})`;
      const fillColor = `rgba(245, 158, 11, ${alpha * 0.12})`;

      drawQuad(p1, p2, p3, p4, fillColor, strokeColor, 0.85);
    });

    // 3. Outer Ring: 64 High-Tensile Structural Blades
    const outerFins = Array.from({ length: 64 }, (_, i) => {
      const angle = (i / 64 * Math.PI * 2 - rotationOffset * 0.8) % (Math.PI * 2);
      return { index: i, angle, sinVal: Math.sin(angle) };
    });
    outerFins.sort((a, b) => a.sinVal - b.sinVal);

    outerFins.forEach(({ angle }) => {
      let angDiff = Math.abs(angle - currentAngleA);
      if (angDiff > Math.PI) angDiff = Math.PI * 2 - angDiff;

      let lift = 0;
      if (angDiff < spreadAngle) {
        lift = Math.exp(-Math.pow((angDiff / spreadAngle) * 2, 2));
      }

      const scaleY = 0.55 - 0.1 * lift;
      const shearX = -0.22 + 0.1 * lift;
      const rInner = innerRadius;
      const rOuter = outerRadius * (1 + 0.06 * lift);
      const elevation = 14 + 22 * lift;
      const angSpan = (Math.PI * 2) / 64 * 0.82;

      const p1 = projectPoint(rInner, angle, 0, scaleY, shearX, centerX, centerY);
      const p2 = projectPoint(rOuter, angle, 0, scaleY, shearX, centerX, centerY);
      const p3 = projectPoint(rOuter, angle + angSpan, elevation, scaleY, shearX, centerX, centerY);
      const p4 = projectPoint(rInner, angle + angSpan, elevation, scaleY, shearX, centerX, centerY);

      const alpha = Math.min(0.85, 0.06 + (Math.sin(angle) + 1) * 0.18 + 0.45 * lift);
      const isCrosshairAligned = lift > 0.5;
      const strokeColor = isCrosshairAligned ? `rgba(245, 158, 11, ${alpha})` : `rgba(148, 163, 184, ${alpha * 0.35})`;
      const fillColor = isCrosshairAligned ? `rgba(245, 158, 11, ${0.15 * lift})` : `rgba(255, 255, 255, 0.015)`;

      drawQuad(p1, p2, p3, p4, fillColor, strokeColor, 0.9);
    });

    // 4. Subtle Crosshair Coordinates HUD following the cursor
    ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mouseX - 20, mouseY);
    ctx.lineTo(mouseX + 20, mouseY);
    ctx.moveTo(mouseX, mouseY - 20);
    ctx.lineTo(mouseX, mouseY + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   2. PRODUCT CATALOGUE RENDERING & FILTERING
   ========================================================================== */
function renderCatalogue() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const filtered = MATERIALS_DATA.filter((item) => {
    if (state.selectedCategory !== 'ALL' && item.category !== state.selectedCategory) return false;
    if (state.selectedBrand !== 'ALL' && item.brand !== state.selectedBrand) return false;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const match = item.name.toLowerCase().includes(q) ||
                    item.sku.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.brand.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--bg-surface); border: 1px dashed var(--border-hairline); border-radius: 16px;">
        <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 12px;">No construction materials found matching criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const isSteel = item.category.includes('Steel');
    const isCement = item.category.includes('Cement');
    const priceDisplay = isSteel 
      ? `₹${item.basePricePerTonne.toLocaleString('en-IN')} <span class="price-unit">/ Tonne</span>`
      : isCement 
        ? `₹${item.basePricePerBag} <span class="price-unit">/ 50kg Bag</span>`
        : `₹${item.basePricePerPipe} <span class="price-unit">/ Length</span>`;

    const inBOM = state.bomList.some(b => b.material.id === item.id);

    return `
      <div class="product-card" id="card-${item.id}">
        <div class="product-media">
          <img src="${item.images[0]}" alt="${item.name}" class="product-img" loading="lazy" />
          <span class="product-badge">${item.badge}</span>
        </div>
        <div class="product-body">
          <div class="product-brand">${item.brand} • ${item.subCategory}</div>
          <h3 class="product-name">${item.name}</h3>
          
          <div class="product-specs-chips">
            ${isSteel ? `
              <span class="spec-chip">Grade: ${item.specs.grade}</span>
              <span class="spec-chip">Dia: ${item.specs.diameter}</span>
              <span class="spec-chip">${item.specs.isStandard}</span>
            ` : isCement ? `
              <span class="spec-chip">${item.specs.grade}</span>
              <span class="spec-chip">28-Day: ${item.specs.compressive28Day}</span>
            ` : `
              <span class="spec-chip">${item.specs.size}</span>
              <span class="spec-chip">${item.specs.standard}</span>
            `}
          </div>

          <div class="product-pricing">
            <div>
              <div class="price-val">${priceDisplay}</div>
              <div style="font-size: 11px; color: var(--emerald);">GST ${item.gstRate}% + Mill Invoice</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); text-align: right;">
              SKU: ${item.sku.split('-').slice(0, 3).join('-')}
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn ${inBOM ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="toggleBOMItem('${item.id}')">
              ${inBOM ? '✓ In Quote BOM' : '+ Add to BOM'}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="openComparisonForCategory('${item.category}')">
              ⚖️ Compare
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   3. MULTI-BRAND COMPARISON MATRIX
   ========================================================================== */
function renderComparisonMatrix() {
  const container = document.getElementById('comparisonContainer');
  if (!container) return;

  const category = state.activeComparisonCategory;
  const products = MATERIALS_DATA.filter(m => m.category === category);

  if (category === 'Steel & Structural') {
    container.innerHTML = `
      <div class="comparison-section">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div>
            <span class="section-tag">(02) Multi-Brand Technical Parameter Matrix</span>
            <h2 style="font-size: 26px; font-weight: 800; color: #fff;">Primary TMT Steel Rebar Comparison</h2>
            <p style="color: var(--text-secondary); font-size: 14px;">Comparing primary producers: Tata Tiscon vs Jindal Panther vs JSW Neosteel (12mm Fe 550D)</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm ${state.activeComparisonCategory === 'Steel & Structural' ? 'btn-outline-amber' : ''}" onclick="switchComparisonCat('Steel & Structural')">TMT Steel</button>
            <button class="btn btn-secondary btn-sm ${state.activeComparisonCategory === 'Cement & Concrete' ? 'btn-outline-amber' : ''}" onclick="switchComparisonCat('Cement & Concrete')">Cement</button>
            <button class="btn btn-secondary btn-sm ${state.activeComparisonCategory === 'Plumbing & Piping' ? 'btn-outline-amber' : ''}" onclick="switchComparisonCat('Plumbing & Piping')">Plumbing</button>
          </div>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comp-table">
            <thead>
              <tr>
                <th style="width: 220px;">Technical Parameter</th>
                <th class="brand-col">Tata Tiscon 550D</th>
                <th class="brand-col">Jindal Panther 550D</th>
                <th class="brand-col">JSW Neosteel 550D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div class="param-title">BIS Standard Compliance</div><div class="param-hint">Indian Standard code</div></td>
                <td><strong style="color: var(--emerald);">IS: 1786 (Grade Fe 550D)</strong></td>
                <td>IS: 1786 (Grade Fe 550D)</td>
                <td>IS: 1786 (Grade Fe 550D)</td>
              </tr>
              <tr>
                <td><div class="param-title">Yield Stress (Min N/mm²)</div><div class="param-hint">Load before permanent deformation</div></td>
                <td><strong>550 N/mm²</strong> (Super Ductile)</td>
                <td>550 N/mm²</td>
                <td>550 N/mm²</td>
              </tr>
              <tr>
                <td><div class="param-title">Ultimate Tensile Strength</div><div class="param-hint">Peak failure resistance</div></td>
                <td><strong style="color: var(--amber);">600 N/mm²</strong></td>
                <td>585 N/mm²</td>
                <td>595 N/mm²</td>
              </tr>
              <tr>
                <td><div class="param-title">Elongation %</div><div class="param-hint">Earthquake shock absorption</div></td>
                <td><strong style="color: var(--emerald);">16.0% (Highest Ductility)</strong></td>
                <td>15.0%</td>
                <td>15.5%</td>
              </tr>
              <tr>
                <td><div class="param-title">Weight Per 12m Bar</div><div class="param-hint">Weight tolerance verification</div></td>
                <td>10.66 kg</td>
                <td>10.65 kg</td>
                <td>10.66 kg</td>
              </tr>
              <tr>
                <td><div class="param-title">Indicative Mill Base Rate</div><div class="param-hint">Per metric tonne (Ex-Yard)</div></td>
                <td><span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">₹64,500</span> / Tonne</td>
                <td><span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">₹62,800</span> / Tonne</td>
                <td><span style="font-family: var(--font-mono); font-weight: 700; color: #fff;">₹63,200</span> / Tonne</td>
              </tr>
              <tr>
                <td><div class="param-title">Volume Slab (15T+)</div><div class="param-hint">Pre-negotiated contractor rebate</div></td>
                <td><span style="color: var(--emerald);">-4.0% Discount</span></td>
                <td><span style="color: var(--emerald);">-4.5% Discount</span></td>
                <td><span style="color: var(--emerald);">-4.2% Discount</span></td>
              </tr>
              <tr>
                <td><div class="param-title">Direct Procurement</div><div class="param-hint">Add directly to current RFQ</div></td>
                <td><button class="btn btn-primary btn-sm" onclick="toggleBOMItem('${MATERIALS_DATA[0].id}')">+ Add Tiscon</button></td>
                <td><button class="btn btn-secondary btn-sm" onclick="toggleBOMItem('${MATERIALS_DATA[1].id}')">+ Add Panther</button></td>
                <td><button class="btn btn-secondary btn-sm" onclick="toggleBOMItem('${MATERIALS_DATA[2].id}')">+ Add Neosteel</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (category === 'Cement & Concrete') {
    container.innerHTML = `
      <div class="comparison-section">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div>
            <span class="section-tag">(02) Multi-Brand Technical Parameter Matrix</span>
            <h2 style="font-size: 26px; font-weight: 800; color: #fff;">Premium Brand Cement Comparison</h2>
            <p style="color: var(--text-secondary); font-size: 14px;">UltraTech Super Weather Pro vs ACC Gold Water Shield vs Dalmia DSP HardCem</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm" onclick="switchComparisonCat('Steel & Structural')">TMT Steel</button>
            <button class="btn btn-secondary btn-sm btn-outline-amber" onclick="switchComparisonCat('Cement & Concrete')">Cement</button>
            <button class="btn btn-secondary btn-sm" onclick="switchComparisonCat('Plumbing & Piping')">Plumbing</button>
          </div>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comp-table">
            <thead>
              <tr>
                <th style="width: 220px;">Attribute</th>
                <th class="brand-col">UltraTech Super Weather Pro</th>
                <th class="brand-col">ACC Gold Water Shield</th>
                <th class="brand-col">Dalmia DSP HardCem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Cement Class & Grade</strong></td>
                <td>Engineered Weather-Pro PPC</td>
                <td>Water-Shield PPC</td>
                <td><strong style="color: var(--amber);">OPC 53 Grade</strong></td>
              </tr>
              <tr>
                <td><strong>28-Day Compressive Strength</strong></td>
                <td>54.5 MPa</td>
                <td>52.0 MPa</td>
                <td><strong style="color: var(--emerald);">62.0 MPa (Ultra-High Load)</strong></td>
              </tr>
              <tr>
                <td><strong>Fineness (Blaine's m²/kg)</strong></td>
                <td>360 m²/kg (Dense concrete)</td>
                <td>350 m²/kg</td>
                <td>340 m²/kg</td>
              </tr>
              <tr>
                <td><strong>Initial Setting Time</strong></td>
                <td>120 Minutes</td>
                <td>115 Minutes</td>
                <td>85 Minutes (Faster cycle)</td>
              </tr>
              <tr>
                <td><strong>Base Price (50kg Bag)</strong></td>
                <td><strong style="font-family: var(--font-mono);">₹415 / Bag</strong></td>
                <td><strong style="font-family: var(--font-mono);">₹405 / Bag</strong></td>
                <td><strong style="font-family: var(--font-mono);">₹425 / Bag</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

window.switchComparisonCat = function(cat) {
  state.activeComparisonCategory = cat;
  renderComparisonMatrix();
};

window.openComparisonForCategory = function(cat) {
  state.activeComparisonCategory = cat;
  switchView('comparison');
  renderComparisonMatrix();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ==========================================================================
   4. BILL OF MATERIALS (BOM) & WHATSAPP GENERATOR
   ========================================================================== */
window.toggleBOMItem = function(matId) {
  const existingIdx = state.bomList.findIndex(b => b.material.id === matId);
  if (existingIdx !== -1) {
    state.bomList.splice(existingIdx, 1);
  } else {
    const mat = MATERIALS_DATA.find(m => m.id === matId);
    if (mat) {
      state.bomList.push({
        material: mat,
        qty: mat.category.includes('Steel') ? 2 : 100,
        unit: mat.unit
      });
    }
  }
  updateBOMUI();
  renderCatalogue();
};

window.updateBOMQty = function(matId, newQty) {
  const item = state.bomList.find(b => b.material.id === matId);
  if (item) {
    item.qty = Math.max(0.5, parseFloat(newQty) || 1);
    updateBOMUI();
  }
};

window.removeBOMItem = function(matId) {
  state.bomList = state.bomList.filter(b => b.material.id !== matId);
  updateBOMUI();
  renderCatalogue();
};

function updateBOMUI() {
  const countBadge = document.getElementById('bomCountBadge');
  const dockBadge = document.getElementById('dockBomBadge');
  if (countBadge) countBadge.innerText = state.bomList.length;
  if (dockBadge) dockBadge.innerText = state.bomList.length;

  const container = document.getElementById('bomItemsList');
  if (!container) return;

  if (state.bomList.length === 0) {
    container.innerHTML = `
      <div style="padding: 40px 10px; text-align: center; color: var(--text-muted);">
        <p style="font-size: 14px;">Your Material List is empty.</p>
        <p style="font-size: 12px; margin-top: 4px;">Click "+ Add to BOM" on any product to assemble your project estimate.</p>
      </div>
    `;
    document.getElementById('bomSubtotal').innerText = '₹0';
    document.getElementById('bomGST').innerText = '₹0';
    document.getElementById('bomTotal').innerText = '₹0';
    return;
  }

  let subtotal = 0;
  let totalGst = 0;

  const html = state.bomList.map(({ material, qty, unit }) => {
    let rate = 0;
    if (material.category.includes('Steel')) {
      rate = material.basePricePerTonne;
    } else if (material.category.includes('Cement')) {
      rate = material.basePricePerBag;
    } else {
      rate = material.basePricePerPipe;
    }

    const itemTotal = rate * qty;
    const gstAmount = (itemTotal * material.gstRate) / 100;
    subtotal += itemTotal;
    totalGst += gstAmount;

    return `
      <div class="bom-item-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="font-size: 11px; color: var(--amber); font-weight: 700; text-transform: uppercase;">${material.brand}</div>
            <strong style="font-size: 14px; color: #fff;">${material.name}</strong>
          </div>
          <button style="background:transparent; border:none; color: var(--danger); cursor:pointer; font-size:16px;" onclick="removeBOMItem('${material.id}')" title="Remove">✕</button>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <input type="number" min="0.5" step="0.5" value="${qty}" style="width: 75px; background: var(--bg-dark); color:#fff; border:1px solid var(--border-hairline); border-radius:4px; padding:4px 8px; font-family: var(--font-mono); font-size: 13px;" onchange="updateBOMQty('${material.id}', this.value)" />
            <span style="font-size: 12px; color: var(--text-muted);">${unit}</span>
          </div>
          <div style="font-family: var(--font-mono); font-weight: 700; color: #fff; font-size: 14px;">
            ₹${Math.round(itemTotal).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  const grandTotal = subtotal + totalGst;
  document.getElementById('bomSubtotal').innerText = `₹${Math.round(subtotal).toLocaleString('en-IN')}`;
  document.getElementById('bomGST').innerText = `₹${Math.round(totalGst).toLocaleString('en-IN')}`;
  document.getElementById('bomTotal').innerText = `₹${Math.round(grandTotal).toLocaleString('en-IN')}`;
}

window.toggleBOMDrawer = function(open) {
  const drawer = document.getElementById('bomDrawer');
  const backdrop = document.getElementById('bomBackdrop');
  if (open) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
};

window.sendBOMToWhatsApp = function() {
  if (state.bomList.length === 0) {
    alert('Please add at least one material to your Bill of Materials first.');
    return;
  }

  let text = `*New Material Quotation Request (CMEMP Platform)*%0A`;
  text += `Site: Royal Palms, Bhubaneswar - 751024%0A%0A`;
  text += `*Requested Materials:*%0A`;

  state.bomList.forEach((b, i) => {
    text += `${i + 1}. ${b.material.name} - *${b.qty} ${b.unit}*%0A`;
  });

  text += `%0APlease share comparative stockist rates, freight breakdown, and earliest delivery slot.`;
  const url = `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${text}`;
  window.open(url, '_blank');
};

/* ==========================================================================
   5. NAVIGATION / VIEW SWITCHER
   ========================================================================== */
window.switchView = function(viewName) {
  state.activeView = viewName;

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  document.querySelectorAll('.view-section').forEach(sec => {
    sec.style.display = sec.id === `view-${viewName}` ? 'block' : 'none';
  });

  if (viewName === 'comparison') {
    renderComparisonMatrix();
  } else if (viewName === 'directory') {
    renderDirectory();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ==========================================================================
   6. DIRECTORIES & LOGISTICS RENDERING
   ========================================================================== */
function renderDirectory() {
  const container = document.getElementById('directoryGrid');
  if (!container) return;

  const workmenHtml = WORKMEN_DIRECTORY.map(w => `
    <div class="pipeline-card">
      <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 14px;">
        <img src="${w.photo}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1px solid var(--amber);" />
        <div>
          <h4 style="color: #fff; font-size: 16px; margin: 0;">${w.name}</h4>
          <span style="font-size: 12px; color: var(--amber);">${w.trade}</span>
        </div>
      </div>
      <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">${w.speciality}</p>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
        <div>📍 Pincodes: ${w.pincodesServed.join(', ')}</div>
        <div>👥 Crew: ${w.crewSize} • ${w.experienceYears} Years Exp</div>
        <div style="color: var(--emerald); font-weight: 600; margin-top: 4px;">💰 Rate: ${w.rateCard}</div>
      </div>
      <a href="tel:${w.phone}" class="btn btn-secondary btn-sm" style="width: 100%;">📞 Contact Contractor</a>
    </div>
  `).join('');

  const expertsHtml = EXPERT_ADVISORS.map(e => `
    <div class="pipeline-card" style="border-color: rgba(56, 189, 248, 0.3);">
      <div class="pipeline-num" style="color: var(--cyan);">Certified Expert Advisor</div>
      <h4 style="color: #fff; font-size: 17px; margin-bottom: 4px;">${e.name}</h4>
      <div style="font-size: 12px; color: var(--cyan); margin-bottom: 12px;">${e.designation} (${e.qualification})</div>
      <ul style="padding-left: 18px; font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
        ${e.services.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-hairline);">
        <span style="font-size: 12px; font-weight: 700; color: #fff;">${e.consultationFee}</span>
        <button class="btn btn-outline-amber btn-sm" onclick="alert('Consultation booking sent for ${e.name}. Our engineering coordinator will reach out shortly.')">Book Site Visit</button>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div style="margin-bottom: 40px;">
      <h3 style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px;">Vetted Skilled Contractors & Masons</h3>
      <div class="pipeline-grid">${workmenHtml}</div>
    </div>
    <div>
      <h3 style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px;">Structural Engineers & Material Estimators</h3>
      <div class="pipeline-grid">${expertsHtml}</div>
    </div>
  `;
}

/* ==========================================================================
   7. 100% COMPLETE: 120-FEATURE VENDOR RFP INSPECTOR & INTERACTIVE MODALS
   ========================================================================== */
window.toggleRFPModal = function(show) {
  const modal = document.getElementById('rfpModal');
  if (modal) {
    modal.classList.toggle('open', show);
    if (show) render120RFPChecklist();
  }
};

window.filterRFPList = function() {
  const search = document.getElementById('rfpSearchInput')?.value.toLowerCase() || '';
  const moduleFilter = document.getElementById('rfpModuleSelect')?.value || 'ALL';
  state.rfpSearchQuery = search;
  state.rfpModuleFilter = moduleFilter;
  render120RFPChecklist();
};

function render120RFPChecklist() {
  const container = document.getElementById('rfp120TableBody');
  const countEl = document.getElementById('rfpMatchCount');
  if (!container) return;

  const filtered = ALL_120_RFP_CHECKLIST_ITEMS.filter(item => {
    if (state.rfpModuleFilter !== 'ALL' && !item.module.startsWith(state.rfpModuleFilter)) return false;
    if (state.rfpSearchQuery) {
      const q = state.rfpSearchQuery;
      const match = item.feature.toLowerCase().includes(q) ||
                    item.section.toLowerCase().includes(q) ||
                    item.module.toLowerCase().includes(q) ||
                    item.notes.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (countEl) countEl.innerText = `${filtered.length} of 120 Items Matching`;

  container.innerHTML = filtered.map((item, idx) => `
    <tr>
      <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${item.id}</td>
      <td style="font-size: 12px; color: var(--amber); font-weight: 600;">${item.module}</td>
      <td style="font-size: 12px; color: var(--cyan);">${item.section}</td>
      <td><strong style="color: #fff; font-size: 13px;">${item.feature}</strong></td>
      <td>
        <span style="background: rgba(16, 185, 129, 0.15); color: var(--emerald); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; display: inline-flex; align-items: center; gap: 4px;">
          ✓ Included
        </span>
      </td>
      <td style="font-family: var(--font-mono); font-size: 12px; color: #cbd5e1;">${item.cost}</td>
      <td style="font-size: 12px; color: var(--text-secondary); max-width: 260px;">${item.notes}</td>
    </tr>
  `).join('');
}

// 8. INTERACTIVE MODALS (OTP, PO, CHALLAN, DRAWING UPLOAD, STATIC PAGES)
window.openOTPModal = function() {
  const modal = document.getElementById('otpModal');
  if (modal) modal.classList.add('open');
};

window.closeOTPModal = function() {
  const modal = document.getElementById('otpModal');
  if (modal) modal.classList.remove('open');
};

window.verifyOTP = function() {
  const code = document.getElementById('otpInput')?.value || '';
  if (code.length === 4) {
    state.isLoggedIn = true;
    closeOTPModal();
    alert(`Mobile Authentication Successful for ${state.userPhone}!\nLogged into Customer Dashboard.`);
    switchView('dashboard');
  } else {
    alert('Please enter a valid 4-digit OTP (e.g. 5821).');
  }
};

window.openDrawingUploadModal = function() {
  const modal = document.getElementById('drawingModal');
  if (modal) modal.classList.add('open');
};

window.closeDrawingUploadModal = function() {
  const modal = document.getElementById('drawingModal');
  if (modal) modal.classList.remove('open');
};

window.submitDrawingRequirement = function(e) {
  if (e) e.preventDefault();
  closeDrawingUploadModal();
  alert('Structural Drawing & Material Requirement Submitted!\n\nRFQ Reference: RFQ-BBS-2026-9901\nOur chief structural estimator will generate the multi-brand comparative Bill of Quantities within 2 hours.');
};

window.openChallanModal = function() {
  const modal = document.getElementById('challanModal');
  if (modal) modal.classList.add('open');
};

window.closeChallanModal = function() {
  const modal = document.getElementById('challanModal');
  if (modal) modal.classList.remove('open');
};

window.openPOModal = function() {
  const modal = document.getElementById('poModal');
  if (modal) modal.classList.add('open');
};

window.closePOModal = function() {
  const modal = document.getElementById('poModal');
  if (modal) modal.classList.remove('open');
};

window.openStaticPage = function(pageName) {
  let title = "Company Information";
  let content = "";

  if (pageName === 'about') {
    title = "About CMEMP · Procurement Infrastructure";
    content = "CMEMP connects primary steel mills (Tata Steel, Jindal Steel, JSW) and cement manufacturers (UltraTech, ACC, Dalmia) with construction projects, infrastructure builders, and contractors across Eastern India. Headquartered at DLF Cybercity, Bhubaneswar, we provide transparent landed pricing, certified test invoices, and automated site delivery logistics.";
  } else if (pageName === 'terms') {
    title = "Terms & Conditions & Quotation Validity";
    content = "1. Price Validity: Raw steel and cement rates carry a 24-hour to 48-hour price lock upon quotation confirmation.\n2. Dispatch & Unloading: Standard delivery includes transit to site. Unloading demurrage applies if site access is restricted beyond 2 hours.\n3. Inspection & MTC: Mill Test Certificates are provided with each dispatched lot.";
  } else if (pageName === 'privacy') {
    title = "Data Privacy & Corporate Security";
    content = "We adhere to ISO 27001 and strict enterprise data governance. Customer GSTIN, site coordinates, and purchase order financials are encrypted at rest and in transit via TLS 1.3.";
  }

  alert(`${title}\n\n${content}`);
};

// 9. BLOG & FAQ RENDERING
function renderBlogAndFAQs() {
  const blogContainer = document.getElementById('blogGrid');
  if (blogContainer) {
    blogContainer.innerHTML = BLOG_POSTS.map(post => `
      <div class="pipeline-card" style="display: flex; flex-direction: column;">
        <span class="pipeline-num">${post.category} • ${post.readTime}</span>
        <h3 class="pipeline-heading" style="font-size: 17px; margin-bottom: 8px;">${post.title}</h3>
        <p class="pipeline-text" style="margin-bottom: 16px; flex: 1;">${post.excerpt}</p>
        <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-hairline); padding-top: 12px;">
          <span>Published: ${post.date}</span>
          <button class="btn btn-secondary btn-sm" onclick="alert('${post.title}\\n\\n${post.content}')">Read Full Article</button>
        </div>
      </div>
    `).join('');
  }

  const faqContainer = document.getElementById('faqAccordion');
  if (faqContainer) {
    faqContainer.innerHTML = FAQS_DATA.map((faq, i) => `
      <details style="background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: 8px; padding: 14px 18px; margin-bottom: 12px; cursor: pointer;">
        <summary style="font-size: 15px; font-weight: 700; color: #fff; outline: none;">
          ${faq.question}
        </summary>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 10px; line-height: 1.6;">
          ${faq.answer}
        </p>
      </details>
    `).join('');
  }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  renderCatalogue();
  renderComparisonMatrix();
  updateBOMUI();
  renderBlogAndFAQs();
  render120RFPChecklist();

  // Category filter click events
  document.querySelectorAll('.filter-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCategory = btn.getAttribute('data-cat') || 'ALL';
      renderCatalogue();
    });
  });

  // Search input
  const searchInput = document.getElementById('catalogueSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalogue();
    });
  }
});

