/* ==========================================================================
   DATVIET'S FARM — GIẤM ĐIỀU HỮU CƠ
   Interactive Cart, Refill Discount, Recipe Explorer & UI Logic
   ========================================================================== */

(() => {
  'use strict';

  // ================= CATALOG =================
  const PRODUCTS = {
    'giam-500': {
      id: 'giam-500',
      name: 'Giấm Điều Hữu Cơ 500ml',
      subtitle: 'Chai thủy tinh tái chế • Có mã QR tích điểm',
      price: 60000,
      bottles: 1,
      image: 'images/500ml.webp'
    },
    'giam-1000': {
      id: 'giam-1000',
      name: 'Giấm Điều Hữu Cơ 1000ml',
      subtitle: 'Dung tích gia đình • Tiết kiệm 10.000đ',
      price: 110000,
      bottles: 1,
      image: 'images/1000ml.webp'
    },
    'combo-xanh': {
      id: 'combo-xanh',
      name: 'Combo Sống Xanh (500ml + 1000ml)',
      subtitle: 'Trọn bộ nấu ăn & Detox 14 ngày • Tiết kiệm 10.000đ',
      price: 160000,
      bottles: 2,
      image: 'images/1000ml.webp'
    }
  };

  const FREE_SHIP_THRESHOLD = 300000;
  const STANDARD_SHIPPING_FEE = 25000;
  const REFILL_DISCOUNT_RATE = 0.25;
  const STORAGE_KEY = 'datviets_farm_cart_v1';

  // ================= RECIPES DATA =================
  const RECIPES = {
    'salad-nhiet-doi': {
      category: 'Salad & Eat Clean',
      title: 'Salad Nhiệt Đới Ức Gà & Bơ Sốt Giấm Điều Mật Ong',
      time: '10 phút',
      dosage: '2 muỗng canh (30ml) Giấm Điều DATVIET\'S FARM',
      ingredients: [
        '2 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '1 muỗng canh mật ong nguyên chất & 2 muỗng dầu oliu',
        '150g ức gà áp chảo thảo mộc thái lát',
        '1/2 trái bơ sáp chín, 100g rau xà lách & cải mầm',
        '6–8 quả cà chua bi, 20g hạt điều rang bùi giã dập',
        '1 nhúm tiêu đen xay & muối hồng'
      ],
      steps: [
        'Khuấy đều Giấm Điều, mật ong, dầu oliu, muối hồng và tiêu đen trong lọ nhỏ đến khi hỗn hợp sốt sánh mịn, dậy hương trái điều dịu nhẹ.',
        'Xếp rau xanh, cà chua bi cắt đôi, bơ sáp và ức gà áp chảo vào tô gốm.',
        'Rưới đều phần sốt Giấm Điều mật ong lên trên ngay trước khi thưởng thức.',
        'Rắc thêm hạt điều rang bùi tạo độ giòn và trộn nhẹ tay.'
      ],
      tip: 'Mẹo nhỏ: Hương thơm đặc trưng của trái điều lên men giúp món salad thanh mát mà không bị mùi chua gắt như giấm trắng thông thường.'
    },
    'detox-14-ngay': {
      category: 'Thử thách Detox 14 ngày',
      title: 'Nước Detox Giấm Điều Mật Ong & Hạt Chia',
      time: '3 phút',
      dosage: '15ml (1 muỗng canh) Giấm Điều DATVIET\'S FARM',
      ingredients: [
        '15ml Giấm Điều Hữu Cơ DATVIET\'S FARM (giữ nguyên men sống)',
        '250ml nước ấm (khoảng 40°C) hoặc nước mát',
        '1 thìa cà phê mật ong nguyên chất',
        '1 thìa cà phê hạt chia đã ngâm nở',
        '2 lát chanh tươi & vài lá bạc hà'
      ],
      steps: [
        'Rót 250ml nước ấm vừa phải (không dùng nước sôi để bảo toàn Vitamin C và lợi khuẩn Probiotic sống).',
        'Thêm 15ml Giấm Điều và 1 thìa mật ong, khuấy tan hoàn toàn.',
        'Cho hạt chia nở, lát chanh tươi và lá bạc hà vào ly (có thể thêm đá viên nếu uống lạnh).',
        'Uống vào buổi sáng trước bữa ăn khoảng 15–20 phút để hỗ trợ hệ tiêu hóa và trao đổi chất.'
      ],
      tip: 'Lưu ý: Luôn pha loãng Giấm Điều với nước trước khi uống và duy trì đều đặn trong 14 ngày để cảm nhận sự nhẹ nhàng của hệ tiêu hóa.'
    },
    'goi-cuon-nuoc-cham': {
      category: 'Nước chấm Healthy',
      title: 'Nước Chấm Chua Ngọt Healthy & Gỏi Cuốn Tôm Thảo Mộc',
      time: '15 phút',
      dosage: '3 muỗng canh Giấm Điều DATVIET\'S FARM',
      ingredients: [
        '3 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '2 muỗng canh nước mắm ngon & 2 muỗng đường thốt nốt/đường nâu',
        '4 muỗng canh nước lọc ấm',
        'Tỏi băm nhuyễn, ớt sừng băm nhỏ, ít cà rốt thái sợi mảnh',
        'Gỏi cuốn: bánh tráng, tôm luộc, rau thơm, bún tươi, dưa leo'
      ],
      steps: [
        'Hòa tan đường thốt nốt vào nước ấm, sau đó cho nước mắm ngon và 3 muỗng canh Giấm Điều vào khuấy đều.',
        'Khi nước chấm nguội hoàn toàn mới thả tỏi ớt băm vào để tỏi ớt nổi đẹp trên mặt.',
        'Cuốn chặt bánh tráng cùng tôm luộc, rau thảo mộc, dưa leo và bún tươi.',
        'Thưởng thức kèm chén nước chấm Giấm Điều thanh dịu, hậu ngọt sâu.'
      ],
      tip: 'Thay thế giấm công nghiệp bằng Giấm Điều giúp chén nước chấm giữ được vị chua êm ái, tốt cho dạ dày của cả gia đình.'
    },
    'kem-vani-giam-dieu': {
      category: 'Sáng tạo vị giác #GiamDieuCreative',
      title: 'Kem Vani Sốt Giấm Điều Ủ & Xoài Nhiệt Đới',
      time: '12 phút',
      dosage: '30ml Giấm Điều DATVIET\'S FARM cô đặc',
      ingredients: [
        '30ml Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '2 muỗng canh mật ong hoặc đường nâu hữu cơ',
        '2 viên kem Vani thủ công (Vanilla Bean)',
        '1/2 quả xoài chín vàng cắt hạt lựu',
        '15g hạt điều rang giã nhỏ & lá bạc hà trang trí'
      ],
      steps: [
        'Cho Giấm Điều và mật ong vào chảo nhỏ, đun lửa thật nhỏ khoảng 5–7 phút cho đến khi hỗn hợp sánh lại như caramel hổ phách (reduction).',
        'Tắt bếp và để sốt Giấm Điều nguội hoàn toàn để đạt độ dẻo bóng.',
        'Múc 2 viên kem vani ra bát gốm lạnh, xếp xoài chín cắt hạt lựu xung quanh.',
        'Rưới nhẹ lớp sốt Giấm Điều vàng óng lên trên, rắc hạt điều rang giòn và lá bạc hà.'
      ],
      tip: 'Cảm hứng từ ẩm thực Ý với Balsamic: độ chua thanh và hương trái điều nhiệt đới làm nổi bật vị béo thơm của kem vani đầy bất ngờ!'
    },
    'goi-ngo-sen': {
      category: 'Món Việt truyền thống',
      title: 'Gỏi Ngó Sen Tôm Thịt Trộn Giấm Điều',
      time: '20 phút',
      dosage: '4 muỗng canh Giấm Điều DATVIET\'S FARM',
      ingredients: [
        '4 muỗng canh Giấm Điều (2 muỗng ngâm ngó sen + 2 muỗng pha sốt trộn)',
        '300g ngó sen tươi chẻ đôi, cắt khúc vừa ăn',
        '150g tôm sú luộc bóc vỏ & 100g thịt ba chỉ luộc thái mỏng',
        'Cà rốt bào sợi, rau răm, hành phi thơm & đậu phộng/hạt điều rang',
        '2 muỗng đường, 1,5 muỗng nước mắm, tỏi ớt băm'
      ],
      steps: [
        'Ngâm ngó sen trong âu nước lạnh pha 2 muỗng canh Giấm Điều và vài viên đá khoảng 10 phút rồi vớt ra để ráo — giúp ngó sen trắng giòn tự nhiên.',
        'Pha sốt trộn gồm 2 muỗng Giấm Điều, 2 muỗng đường, 1,5 muỗng nước mắm và tỏi ớt băm.',
        'Trộn đều ngó sen, cà rốt, tôm thịt với 2/3 lượng sốt trong 5 phút cho thấm vị.',
        'Rưới phần sốt còn lại, thêm rau răm, hành phi và hạt điều rang trước khi dọn ra đĩa.'
      ],
      tip: 'Axit hữu cơ và Vitamin C tự nhiên trong Giấm Điều chống thâm ngó sen cực hiệu quả mà vẫn giữ trọn mùi thơm thanh tao.'
    },
    'hai-san-sot-bo-toi': {
      category: 'Món mặn F&B',
      title: 'Tôm & Hải Sản Áp Chảo Sốt Bơ Tỏi Giấm Điều',
      time: '15 phút',
      dosage: '2 muỗng canh Giấm Điều DATVIET\'S FARM',
      ingredients: [
        '2 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '350g tôm sú tươi (hoặc sò điệp, mực tươi) làm sạch',
        '25g bơ lạt, 4 tép tỏi băm nhỏ, 1 nhánh lá mùi tây/húng tây',
        '1 thìa cà phê mật ong, muối biển & tiêu đen xay'
      ],
      steps: [
        'Thấm khô hải sản, ướp nhẹ muối tiêu rồi áp chảo lửa vừa với chút dầu oliu cho xém cạnh thơm lừng, sau đó cho ra đĩa.',
        'Dùng lại chảo, đun chảy bơ lạt và phi thơm tỏi băm.',
        'Đổ 2 muỗng canh Giấm Điều và 1 thìa mật ong vào chảo, đảo nhanh tay khoảng 45 giây để tạo lớp sốt bóng mượt, dậy mùi chua thơm.',
        'Cho hải sản trở lại chảo áo đều sốt bơ tỏi Giấm Điều, rắc rau mùi tây và thưởng thức nóng.'
      ],
      tip: 'Các đầu bếp nhà hàng thực dưỡng yêu thích dùng Giấm Điều ở bước kết thúc (deglaze) để khử tanh hải sản và làm sáng vị sốt bơ.'
    }
  };

  // ================= STATE =================
  let cartState = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.items) {
          return parsed;
        }
      }
    } catch (_) {
      // ignore storage errors
    }
    // Pre-populate 1 bottle of 500ml so visitors immediately experience a live cart
    return {
      items: { 'giam-500': 1 },
      refillEnabled: false
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    } catch (_) {
      // ignore storage errors
    }
  }

  // ================= FORMATTER =================
  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + 'đ';
  }

  // ================= DOM ELEMENTS =================
  const header = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  const headerCartCount = document.getElementById('headerCartCount');
  const cartItemTotalCount = document.getElementById('cartItemTotalCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const refillToggle = document.getElementById('refillToggle');

  const shippingProgressText = document.getElementById('shippingProgressText');
  const shippingProgressBar = document.getElementById('shippingProgressBar');

  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDiscountRow = document.getElementById('summaryDiscountRow');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryShipping = document.getElementById('summaryShipping');
  const summaryPoints = document.getElementById('summaryPoints');
  const summaryTotal = document.getElementById('summaryTotal');

  const checkoutForm = document.getElementById('checkoutForm');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  const recipeModal = document.getElementById('recipeModal');
  const recipeModalBody = document.getElementById('recipeModalBody');
  const closeRecipeModal = document.getElementById('closeRecipeModal');

  const orderModal = document.getElementById('orderModal');
  const orderSuccessBody = document.getElementById('orderSuccessBody');
  const closeOrderModal = document.getElementById('closeOrderModal');

  const toastContainer = document.getElementById('toastContainer');

  // ================= TOAST =================
  function showToast(message, showCartLink = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = showCartLink
      ? `<span>${message}</span> <a href="#gio-hang">Xem giỏ hàng</a>`
      : `<span>${message}</span>`;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // ================= CART OPERATIONS =================
  function addToCart(productId, qty = 1) {
    if (!PRODUCTS[productId]) return;
    cartState.items[productId] = (cartState.items[productId] || 0) + qty;
    saveState();
    renderCart();
    showToast(`Đã thêm <strong>${PRODUCTS[productId].name}</strong> vào giỏ hàng.`, true);
  }

  function updateQty(productId, delta) {
    const current = cartState.items[productId] || 0;
    const next = current + delta;
    if (next <= 0) {
      delete cartState.items[productId];
    } else {
      cartState.items[productId] = next;
    }
    saveState();
    renderCart();
  }

  function removeItem(productId) {
    delete cartState.items[productId];
    saveState();
    renderCart();
  }

  function clearCart() {
    cartState.items = {};
    saveState();
    renderCart();
    showToast('Đã làm trống giỏ hàng.');
  }

  function computeTotals() {
    let itemCount = 0;
    let totalBottles = 0;
    let subtotal = 0;

    for (const [id, qty] of Object.entries(cartState.items)) {
      const prod = PRODUCTS[id];
      if (!prod || qty <= 0) continue;
      itemCount += qty;
      totalBottles += prod.bottles * qty;
      subtotal += prod.price * qty;
    }

    const discount = cartState.refillEnabled ? subtotal * REFILL_DISCOUNT_RATE : 0;
    const afterDiscount = subtotal - discount;
    const shipping = itemCount === 0 ? 0 : (afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
    const total = afterDiscount + shipping;
    const greenPoints = totalBottles * (cartState.refillEnabled ? 15 : 5);

    return { itemCount, totalBottles, subtotal, discount, afterDiscount, shipping, total, greenPoints };
  }

  function renderCart() {
    const totals = computeTotals();

    // Header & section counters
    headerCartCount.textContent = totals.itemCount;
    cartItemTotalCount.textContent = totals.itemCount;
    refillToggle.checked = !!cartState.refillEnabled;

    // Free shipping bar
    if (totals.itemCount === 0) {
      shippingProgressText.innerHTML = `Miễn phí giao hàng nội thành cho đơn hàng từ <strong>${formatVND(FREE_SHIP_THRESHOLD)}</strong>.`;
      shippingProgressBar.style.width = '0%';
    } else if (totals.afterDiscount >= FREE_SHIP_THRESHOLD) {
      shippingProgressText.innerHTML = `Chúc mừng! Đơn hàng của bạn đã được <strong>Miễn phí vận chuyển</strong> toàn nội thành.`;
      shippingProgressBar.style.width = '100%';
    } else {
      const remain = FREE_SHIP_THRESHOLD - totals.afterDiscount;
      const pct = Math.min(100, Math.round((totals.afterDiscount / FREE_SHIP_THRESHOLD) * 100));
      shippingProgressText.innerHTML = `Thêm <strong>${formatVND(remain)}</strong> nữa để được <strong>Miễn phí vận chuyển</strong>!`;
      shippingProgressBar.style.width = `${pct}%`;
    }

    // Items list
    cartItemsList.innerHTML = '';
    const entries = Object.entries(cartState.items).filter(([id, qty]) => PRODUCTS[id] && qty > 0);

    if (entries.length === 0) {
      cartEmptyState.hidden = false;
      clearCartBtn.style.visibility = 'hidden';
      placeOrderBtn.disabled = true;
      placeOrderBtn.style.opacity = '0.6';
    } else {
      cartEmptyState.hidden = true;
      clearCartBtn.style.visibility = 'visible';
      placeOrderBtn.disabled = false;
      placeOrderBtn.style.opacity = '1';

      entries.forEach(([id, qty]) => {
        const prod = PRODUCTS[id];
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-item-img">
            <img src="${prod.image}" alt="${prod.name}" />
          </div>
          <div class="cart-item-details">
            <h4>${prod.name}</h4>
            <span>${prod.subtitle}</span>
            <span>Đơn giá: <strong>${formatVND(prod.price)}</strong></span>
          </div>
          <div class="qty-control" aria-label="Điều chỉnh số lượng">
            <button type="button" class="qty-btn" data-action="dec" data-id="${prod.id}" aria-label="Giảm số lượng">−</button>
            <span class="qty-val">${qty}</span>
            <button type="button" class="qty-btn" data-action="inc" data-id="${prod.id}" aria-label="Tăng số lượng">+</button>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-subtotal">${formatVND(prod.price * qty)}</span>
            <button type="button" class="remove-item-btn" data-action="remove" data-id="${prod.id}">Xóa</button>
          </div>
        `;
        cartItemsList.appendChild(row);
      });
    }

    // Order summary numbers
    summarySubtotal.textContent = formatVND(totals.subtotal);
    if (totals.discount > 0) {
      summaryDiscountRow.hidden = false;
      summaryDiscount.textContent = `-${formatVND(totals.discount)}`;
    } else {
      summaryDiscountRow.hidden = true;
    }

    summaryShipping.textContent = totals.itemCount === 0
      ? '0đ'
      : (totals.shipping === 0 ? 'Miễn phí' : formatVND(totals.shipping));

    summaryPoints.textContent = `+${totals.greenPoints} điểm`;
    summaryTotal.textContent = formatVND(totals.total);
  }

  // ================= EVENT BINDINGS =================
  // Add to cart buttons across page
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id, 1);
    });
  });

  // Cart item delegation (+ / - / remove)
  cartItemsList.addEventListener('click', (e) => {
    const target = e.target.closest('button[data-action]');
    if (!target) return;
    const { action, id } = target.dataset;
    if (action === 'inc') updateQty(id, 1);
    else if (action === 'dec') updateQty(id, -1);
    else if (action === 'remove') removeItem(id);
  });

  clearCartBtn.addEventListener('click', () => {
    if (Object.keys(cartState.items).length === 0) return;
    clearCart();
  });

  refillToggle.addEventListener('change', () => {
    cartState.refillEnabled = refillToggle.checked;
    saveState();
    renderCart();
    if (cartState.refillEnabled) {
      showToast('Đã áp dụng ưu đãi Hoàn chai & Refill giảm 25%!');
    }
  });

  // Checkout submit
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const totals = computeTotals();
    if (totals.itemCount === 0) {
      showToast('Giỏ hàng đang trống. Vui lòng chọn sản phẩm trước khi đặt.');
      return;
    }

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !phone || !address) {
      showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    const orderCode = 'DVF-' + Math.floor(100000 + Math.random() * 900000);
    const paymentLabel = payment === 'COD'
      ? 'Thanh toán khi nhận hàng (COD)'
      : 'Chuyển khoản ngân hàng / Quét mã QR';

    const itemsSummaryHtml = Object.entries(cartState.items)
      .filter(([id, qty]) => PRODUCTS[id] && qty > 0)
      .map(([id, qty]) => `<li>${PRODUCTS[id].name} &times; <strong>${qty}</strong> (${formatVND(PRODUCTS[id].price * qty)})</li>`)
      .join('');

    orderSuccessBody.innerHTML = `
      <div class="success-icon">✓</div>
      <h3 id="orderModalTitle" style="margin:0 0 8px;color:var(--green-deep);">Đặt hàng thành công!</h3>
      <p style="margin:0;color:var(--ink-secondary);font-size:0.92rem;">
        Cảm ơn <strong>${escapeHtml(name)}</strong> đã chung tay <em>"Giải cứu hương vị"</em> cùng <strong>DATVIET'S FARM</strong>.
      </p>
      <div class="order-summary-card">
        <div style="margin-bottom:8px;"><strong>Mã đơn hàng:</strong> ${orderCode}</div>
        <div style="margin-bottom:8px;"><strong>Người nhận:</strong> ${escapeHtml(name)} (${escapeHtml(phone)})</div>
        <div style="margin-bottom:8px;"><strong>Địa chỉ:</strong> ${escapeHtml(address)}</div>
        <div style="margin-bottom:8px;"><strong>Thanh toán:</strong> ${paymentLabel}</div>
        <ul style="margin:8px 0;padding-left:18px;">${itemsSummaryHtml}</ul>
        ${cartState.refillEnabled ? '<div style="color:var(--green-primary);font-weight:600;margin-bottom:6px;">✓ Đã áp dụng chương trình Hoàn chai Refill (-25%)</div>' : ''}
        <div style="padding-top:8px;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;">
          <strong>Tổng thanh toán:</strong>
          <strong style="color:var(--green-primary);font-size:1.05rem;">${formatVND(totals.total)}</strong>
        </div>
        <div style="margin-top:6px;font-size:0.82rem;color:var(--green-primary);">
          Bạn tích lũy được <strong>+${totals.greenPoints} Điểm Xanh</strong> (quét mã QR trên chai để đổi quà).
        </div>
      </div>
      <p style="font-size:0.82rem;color:var(--ink-muted);margin:0 0 18px;">
        Đơn hàng sẽ được đóng gói bằng hộp xốp bảo vệ chai thủy tinh và giao qua GHTK / Grab. Nhóm Les Génies sẽ gọi xác nhận qua số 0382 610 439.
      </p>
      <button type="button" class="btn btn-primary btn-full" id="doneOrderBtn">Tiếp tục khám phá</button>
    `;

    orderModal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Reset form & cart after successful order
    checkoutForm.reset();
    cartState.items = {};
    cartState.refillEnabled = false;
    saveState();
    renderCart();

    document.getElementById('doneOrderBtn').addEventListener('click', closeModals);
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  // ================= RECIPE FILTER & MODAL =================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const recipeCards = document.querySelectorAll('.recipe-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      recipeCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
      });
    });
  });

  function openRecipeModal(recipeKey) {
    const r = RECIPES[recipeKey];
    if (!r) return;

    recipeModalBody.innerHTML = `
      <div class="modal-recipe-header">
        <span class="sub-tag">${r.category}</span>
        <h3 id="modalRecipeTitle">${r.title}</h3>
        <div class="recipe-meta">
          <span>Thời gian: ${r.time}</span>
          <span>&bull;</span>
          <span>Định lượng: ${r.dosage}</span>
        </div>
      </div>

      <div class="modal-recipe-grid">
        <div class="modal-recipe-box">
          <h4>Nguyên liệu chuẩn bị</h4>
          <ul>${r.ingredients.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="modal-recipe-box">
          <h4>Cách thực hiện</h4>
          <ol>${r.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
        </div>
      </div>

      <div class="modal-tip">
        <strong>Gợi ý từ DATVIET'S FARM:</strong> ${r.tip}
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-end;">
        <button type="button" class="btn btn-outline btn-sm" id="modalCloseSecondary">Đóng lại</button>
        <button type="button" class="btn btn-primary btn-sm" id="modalBuyVinegar">+ Thêm Giấm Điều 500ml vào giỏ</button>
      </div>
    `;

    recipeModal.hidden = false;
    document.body.style.overflow = 'hidden';

    document.getElementById('modalCloseSecondary').addEventListener('click', closeModals);
    document.getElementById('modalBuyVinegar').addEventListener('click', () => {
      addToCart('giam-500', 1);
      closeModals();
    });
  }

  document.querySelectorAll('.recipe-btn').forEach((btn) => {
    btn.addEventListener('click', () => openRecipeModal(btn.dataset.recipe));
  });

  function closeModals() {
    recipeModal.hidden = true;
    orderModal.hidden = true;
    document.body.style.overflow = '';
  }

  closeRecipeModal.addEventListener('click', closeModals);
  closeOrderModal.addEventListener('click', closeModals);

  [recipeModal, orderModal].forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });

  // ================= HEADER, MOBILE NAV & SCROLL SPY =================
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 18);
  }, { passive: true });

  // Active nav highlight on scroll
  const sectionIds = ['gioi-thieu', 'quy-trinh', 'cong-dung', 'mon-an', 'gio-hang'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-32% 0px -56% 0px', threshold: 0 }
  );

  sections.forEach((sec) => spyObserver.observe(sec));

  // ================= SCROLL REVEAL =================
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ================= INIT =================
  renderCart();
})();
