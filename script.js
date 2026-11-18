/* ==========================================================================
   DATVIET'S FARM — GIẤM ĐIỀU HỮU CƠ
   Unified Application Logic: Multi-Page Navigation, Shared Cart,
   Volume Discounts, VietQR 10-Minute Timer, Recipe Modals & AI Chatbot
   ========================================================================== */

(() => {
  'use strict';

  // ================= CATALOG =================
  const PRODUCTS = {
    'giam-500': {
      id: 'giam-500',
      name: 'Giấm Điều Hữu Cơ 500ml',
      subtitle: 'Chai nhựa rPET tái chế • Có mã QR truy xuất',
      price: 60000,
      bottles: 1,
      image: 'images/500ml.webp'
    },
    'giam-1000': {
      id: 'giam-1000',
      name: 'Giấm Điều Hữu Cơ 1000ml',
      subtitle: 'Dung tích gia đình • Chai nhựa rPET tái chế',
      price: 110000,
      bottles: 1,
      image: 'images/1000ml.webp'
    },
    'combo-xanh': {
      id: 'combo-xanh',
      name: 'Combo Tiết Kiệm (500ml + 1000ml)',
      subtitle: 'Trọn bộ nấu ăn & Detox 14 ngày • Tiết kiệm 10.000đ',
      price: 160000,
      bottles: 2,
      image: 'images/1000ml.webp'
    }
  };

  const FREE_SHIP_THRESHOLD = 300000;
  const STANDARD_SHIPPING_FEE = 25000;
  const STORAGE_KEY = 'datviets_farm_cart_v2';

  // ================= RECIPES DATA =================
  const RECIPES = {
    'salad-nhiet-doi': {
      category: 'Salad & Eat Clean',
      title: 'Salad Nhiệt Đới Sốt Giấm Điều Mật Ong',
      time: '10 phút',
      dosage: '2 muỗng canh (30ml) Giấm Điều DATVIET\'S FARM',
      image: 'images/recipe-salad.webp',
      ingredients: [
        '2 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '1 muỗng canh mật ong nguyên chất & 2 muỗng dầu oliu',
        '100g xoài chín & dứa tươi thái lát',
        '1/2 trái bơ sáp chín, 100g rau xà lách & cải mầm',
        'Hạt lựu đỏ, 20g hạt điều rang bùi giã dập',
        '1 nhúm tiêu đen xay & muối hồng'
      ],
      steps: [
        'Khuấy đều Giấm Điều, mật ong, dầu oliu, muối hồng và tiêu đen trong chén nhỏ đến khi hỗn hợp sốt sánh mịn, dậy hương thơm trái điều dịu nhẹ.',
        'Xếp rau xanh, bơ sáp, dứa và xoài tươi vào tô gốm mộc.',
        'Rưới đều phần sốt Giấm Điều mật ong lên trên ngay trước khi thưởng thức.',
        'Rắc thêm hạt điều rang bùi giòn tan và trộn nhẹ tay.'
      ],
      tip: 'Hương thơm nhiệt đới đặc trưng của Giấm Điều hòa quyện cùng mật ong tạo nên vị chua ngọt thanh mát, không hề gắt cổ như giấm công nghiệp.'
    },
    'detox-14-ngay': {
      category: 'Thử thách Detox 14 ngày',
      title: 'Nước Detox Giấm Điều Mật Ong & Hạt Chia',
      time: '3 phút',
      dosage: '15ml (1 muỗng canh) Giấm Điều DATVIET\'S FARM',
      image: 'images/recipe-detox.webp',
      ingredients: [
        '15ml Giấm Điều Hữu Cơ DATVIET\'S FARM (giàu men vi sinh sống)',
        '250ml nước ấm (khoảng 35–40°C) hoặc nước mát',
        '1 thìa cà phê mật ong nguyên chất',
        '1 thìa cà phê hạt chia ngâm nở',
        '2 lát chanh tươi/cam vàng & vài lá bạc hà'
      ],
      steps: [
        'Rót 250ml nước ấm vừa phải (không dùng nước sôi để bảo toàn Vitamin C và enzyme Probiotic sống).',
        'Thêm 15ml Giấm Điều và 1 thìa mật ong, khuấy tan hoàn toàn.',
        'Cho hạt chia ngâm nở, lát chanh tươi và lá bạc hà vào ly (thêm đá viên nếu thích uống lạnh giải khát).',
        'Uống vào buổi sáng trước bữa ăn 15–20 phút trong thử thách 14 ngày để thanh lọc và khởi động hệ tiêu hóa.'
      ],
      tip: 'Axit axetic tự nhiên kết hợp cùng Vitamin C cao gấp 5 lần cam giúp đánh thức năng lượng và hỗ trợ kiểm soát đường huyết sau bữa ăn.'
    },
    'goi-cuon-nuoc-cham': {
      category: 'Nước chấm Healthy',
      title: 'Nước Chấm Chua Ngọt Healthy & Gỏi Cuốn Tôm',
      time: '15 phút',
      dosage: '3 muỗng canh Giấm Điều DATVIET\'S FARM',
      image: 'images/recipe-dip.webp',
      ingredients: [
        '3 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '2 muỗng canh nước mắm ngon & 2 muỗng đường thốt nốt',
        '4 muỗng canh nước ấm',
        'Tỏi băm nhuyễn, ớt sừng cắt nhỏ, chanh tươi',
        'Gỏi cuốn: bánh tráng gạo, tôm sú tươi luộc, bún tươi, hẹ lá, rau thơm'
      ],
      steps: [
        'Hòa tan đường thốt nốt trong nước ấm, sau đó cho nước mắm ngon và 3 muỗng Giấm Điều vào khuấy đều.',
        'Chờ nước chấm nguội bớt rồi thả tỏi ớt băm vào để tỏi ớt nổi bồng bềnh đẹp mắt.',
        'Cuốn chặt tay bánh tráng với tôm tươi, rau thơm nhiệt đới và bún gạo.',
        'Chấm ngập gỏi cuốn vào chén nước chấm Giấm Điều chua thanh, ngọt hậu sâu.'
      ],
      tip: 'Thay giấm trắng công nghiệp bằng Giấm Điều giúp chén nước chấm tròn vị, êm dịu cho dạ dày của cả gia đình.'
    },
    'kem-vani-giam-dieu': {
      category: 'Sáng tạo vị giác',
      title: 'Kem Vani Sốt Giấm Điều Ủ & Xoài Nhiệt Đới',
      time: '12 phút',
      dosage: '30ml Giấm Điều DATVIET\'S FARM cô đặc',
      image: 'images/recipe-dessert.webp',
      ingredients: [
        '30ml Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '2 muỗng canh mật ong hoặc đường nâu',
        '2 viên kem Vani thủ công (Vanilla Bean)',
        '1/2 quả xoài chín cắt hạt lựu',
        '15g hạt điều rang giòn giã nhỏ & lá bạc hà'
      ],
      steps: [
        'Đun Giấm Điều và mật ong trên lửa thật nhỏ khoảng 5–7 phút cho đến khi sánh đặc như caramel óng ánh (reduction).',
        'Để sốt Giấm Điều nguội hoàn toàn.',
        'Múc 2 viên kem vani ra bát gốm lạnh, xếp xoài chín xung quanh.',
        'Rưới lớp sốt Giấm Điều caramel lên bề mặt kem, rắc hạt điều rang và lá bạc hà.'
      ],
      tip: 'Cảm hứng ẩm thực Ý: vị chua thanh và hương trái điều ủ men làm bật vị béo ngậy của kem vani một cách bùng nổ và tinh tế!'
    },
    'goi-ngo-sen': {
      category: 'Món Việt truyền thống',
      title: 'Gỏi Ngó Sen Tôm Thịt Trộn Giấm Điều',
      time: '20 phút',
      dosage: '4 muỗng canh Giấm Điều DATVIET\'S FARM',
      image: 'images/recipe-goi-ngo-sen.webp',
      ingredients: [
        '4 muỗng canh Giấm Điều (2 muỗng ngâm trắng ngó sen + 2 muỗng pha sốt)',
        '300g ngó sen tươi chẻ đôi, cắt khúc vừa ăn',
        '150g tôm sú bóc vỏ & 100g thịt ba chỉ luộc thái mỏng',
        'Cà rốt bào sợi, rau răm, hành phi thơm & hạt điều rang',
        '2 muỗng đường, 1,5 muỗng nước mắm, tỏi ớt băm'
      ],
      steps: [
        'Ngâm ngó sen trong nước lạnh pha 2 muỗng Giấm Điều và đá lạnh 10 phút — giúp ngó sen trắng muốt và giòn tan tự nhiên.',
        'Pha sốt trộn gồm 2 muỗng Giấm Điều, 2 muỗng đường, 1,5 muỗng nước mắm, tỏi ớt băm.',
        'Trộn đều ngó sen, cà rốt, tôm thịt với sốt trong 5 phút cho thấm.',
        'Bày ra đĩa, rắc rau răm, hành phi và hạt điều rang bùi thơm phức.'
      ],
      tip: 'Vitamin C và axit hữu cơ tự nhiên trong Giấm Điều chống thâm ngó sen hoàn hảo mà không cần bất kỳ chất phụ gia hóa chất nào.'
    },
    'hai-san-sot-bo-toi': {
      category: 'Món mặn F&B',
      title: 'Tôm & Hải Sản Áp Chảo Sốt Bơ Tỏi Giấm Điều',
      time: '15 phút',
      dosage: '2 muỗng canh Giấm Điều DATVIET\'S FARM',
      image: 'images/recipe-seafood.webp',
      ingredients: [
        '2 muỗng canh Giấm Điều Hữu Cơ DATVIET\'S FARM',
        '350g tôm sú tươi (hoặc sò điệp, mực ống) làm sạch',
        '25g bơ lạt, 4 tép tỏi băm nhỏ, rau mùi tây băm',
        '1 thìa cà phê mật ong, muối biển & tiêu đen'
      ],
      steps: [
        'Thấm khô tôm sú, áp chảo lửa lớn với chút dầu oliu cho xém cạnh thơm lừng rồi gắp ra đĩa.',
        'Đun chảy bơ lạt trên cùng chảo, phi thơm tỏi băm vàng ươm.',
        'Rót 2 muỗng Giấm Điều và 1 thìa mật ong vào đảo nhanh 45 giây để khử chảo (deglaze), tạo lớp sốt bơ bóng mượt dậy mùi chua thanh.',
        'Cho tôm trở lại đảo đều áo sốt, rắc mùi tây và dùng nóng ngay.'
      ],
      tip: 'Giấm Điều là bí quyết của các đầu bếp để cân bằng độ béo của bơ và tôn lên vị tươi ngọt nguyên bản của hải sản.'
    }
  };

  // ================= STATE =================
  let cartState = loadState();
  let qrCountdownTimer = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.items) {
          return parsed;
        }
      }
    } catch (_) {}
    return {
      items: { 'giam-500': 1 },
      couponCode: ''
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    } catch (_) {}
  }

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + 'đ';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  // ================= TOAST NOTIFICATION =================
  function showToast(message, showCartLink = false) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = showCartLink
      ? `<span>${message}</span> <a href="gio-hang.html">Xem giỏ hàng</a>`
      : `<span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  // ================= TOTALS & VOLUME DISCOUNT CALCULATION =================
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

    // Volume discount tiers or coupon code
    let discountRate = 0;
    let discountReason = '';

    const code = (cartState.couponCode || '').toUpperCase().trim();

    if (code === 'GIAMDIEU15' || subtotal >= 350000) {
      discountRate = 0.15;
      discountReason = 'Ưu đãi đơn từ 350k (-15%)';
    } else if (code === 'GIAMDIEU10' || totalBottles >= 3 || subtotal >= 200000) {
      discountRate = 0.10;
      discountReason = 'Ưu đãi mua từ 3 chai / 200k (-10%)';
    } else if (code === 'GIAMDIEU5' || totalBottles >= 2) {
      discountRate = 0.05;
      discountReason = 'Ưu đãi mua từ 2 chai (-5%)';
    } else if (code === 'EATCLEAN') {
      discountRate = 0.08;
      discountReason = 'Mã EATCLEAN (-8%)';
    }

    const discount = subtotal * discountRate;
    const afterDiscount = subtotal - discount;
    const shipping = itemCount === 0 ? 0 : (afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
    const total = afterDiscount + shipping;
    const greenPoints = totalBottles * 10;

    return {
      itemCount,
      totalBottles,
      subtotal,
      discountRate,
      discountReason,
      discount,
      afterDiscount,
      shipping,
      total,
      greenPoints
    };
  }

  // ================= HEADER BADGE UPDATE =================
  function updateHeaderBadge() {
    const badge = document.getElementById('headerCartCount');
    if (badge) {
      const totals = computeTotals();
      badge.textContent = totals.itemCount;
    }
  }

  // ================= ADD TO CART =================
  function addToCart(productId, qty = 1) {
    if (!PRODUCTS[productId]) return;
    cartState.items[productId] = (cartState.items[productId] || 0) + qty;
    saveState();
    updateHeaderBadge();
    if (typeof renderCartPage === 'function') {
      renderCartPage();
    }
    showToast(`Đã thêm <strong>${PRODUCTS[productId].name}</strong> vào giỏ hàng!`, true);
  }

  // ================= CART PAGE LOGIC (gio-hang.html) =================
  function renderCartPage() {
    const cartItemsList = document.getElementById('cartItemsList');
    if (!cartItemsList) return; // Not on cart page

    const totals = computeTotals();
    const cartItemTotalCount = document.getElementById('cartItemTotalCount');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    const shippingProgressText = document.getElementById('shippingProgressText');
    const shippingProgressBar = document.getElementById('shippingProgressBar');

    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryDiscountRow = document.getElementById('summaryDiscountRow');
    const summaryDiscountLabel = document.getElementById('summaryDiscountLabel');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryShipping = document.getElementById('summaryShipping');
    const summaryPoints = document.getElementById('summaryPoints');
    const summaryTotal = document.getElementById('summaryTotal');

    if (cartItemTotalCount) cartItemTotalCount.textContent = totals.itemCount;

    // Free shipping bar
    if (shippingProgressText && shippingProgressBar) {
      if (totals.itemCount === 0) {
        shippingProgressText.innerHTML = `Miễn phí giao hàng nội thành cho đơn từ <strong>${formatVND(FREE_SHIP_THRESHOLD)}</strong>.`;
        shippingProgressBar.style.width = '0%';
      } else if (totals.afterDiscount >= FREE_SHIP_THRESHOLD) {
        shippingProgressText.innerHTML = `Chúc mừng! Đơn hàng của bạn đã đủ điều kiện <strong>Miễn phí vận chuyển</strong>!`;
        shippingProgressBar.style.width = '100%';
      } else {
        const remain = FREE_SHIP_THRESHOLD - totals.afterDiscount;
        const pct = Math.min(100, Math.round((totals.afterDiscount / FREE_SHIP_THRESHOLD) * 100));
        shippingProgressText.innerHTML = `Thêm <strong>${formatVND(remain)}</strong> nữa để được <strong>Miễn phí vận chuyển</strong>!`;
        shippingProgressBar.style.width = `${pct}%`;
      }
    }

    // Items list
    cartItemsList.innerHTML = '';
    const entries = Object.entries(cartState.items).filter(([id, qty]) => PRODUCTS[id] && qty > 0);

    if (entries.length === 0) {
      if (cartEmptyState) cartEmptyState.hidden = false;
      if (clearCartBtn) clearCartBtn.style.visibility = 'hidden';
      if (placeOrderBtn) {
        placeOrderBtn.disabled = true;
        placeOrderBtn.style.opacity = '0.6';
      }
    } else {
      if (cartEmptyState) cartEmptyState.hidden = true;
      if (clearCartBtn) clearCartBtn.style.visibility = 'visible';
      if (placeOrderBtn) {
        placeOrderBtn.disabled = false;
        placeOrderBtn.style.opacity = '1';
      }

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

    // Summary calculations
    if (summarySubtotal) summarySubtotal.textContent = formatVND(totals.subtotal);
    if (summaryDiscountRow) {
      if (totals.discount > 0) {
        summaryDiscountRow.hidden = false;
        if (summaryDiscountLabel) summaryDiscountLabel.textContent = totals.discountReason;
        if (summaryDiscount) summaryDiscount.textContent = `-${formatVND(totals.discount)}`;
      } else {
        summaryDiscountRow.hidden = true;
      }
    }

    if (summaryShipping) {
      summaryShipping.textContent = totals.itemCount === 0
        ? '0đ'
        : (totals.shipping === 0 ? 'Miễn phí' : formatVND(totals.shipping));
    }

    if (summaryPoints) summaryPoints.textContent = `+${totals.greenPoints} điểm`;
    if (summaryTotal) summaryTotal.textContent = formatVND(totals.total);
  }

  // ================= VIETQR COUNTDOWN & MODAL LOGIC =================
  function startVietQRModal(orderCode, orderName, orderPhone, orderAddress, orderAmount) {
    let qrModal = document.getElementById('qrModal');
    if (!qrModal) {
      qrModal = document.createElement('div');
      qrModal.id = 'qrModal';
      qrModal.className = 'modal-backdrop';
      qrModal.setAttribute('role', 'dialog');
      qrModal.setAttribute('aria-modal', 'true');
      document.body.appendChild(qrModal);
    }

    // VietQR URL with MBBank (0382610439 - Nguyen Thi Lien)
    const qrUrl = `https://img.vietqr.io/image/MB-0382610439-compact2.png?amount=${orderAmount}&addInfo=${encodeURIComponent(orderCode)}&accountName=NGUYEN%20THI%20LIEN`;

    qrModal.innerHTML = `
      <div class="modal-dialog qr-modal-dialog">
        <button class="modal-close" id="closeQrModal" aria-label="Đóng cửa sổ">&times;</button>
        
        <div class="section-badge badge-gold">
          <span>Quét mã VietQR chuyển khoản</span>
        </div>
        <h3 style="margin:6px 0 8px;color:var(--green-deep);font-size:1.45rem;">
          Thanh toán đơn hàng ${orderCode}
        </h3>
        
        <!-- Live 10-Minute Countdown Timer -->
        <div class="qr-timer-pill">
          <span>Thời gian thanh toán còn lại:</span>
          <span class="qr-timer-countdown" id="qrCountdown">10:00</span>
        </div>

        <div class="qr-code-frame">
          <img src="${qrUrl}" alt="Mã VietQR thanh toán Giấm Điều" class="qr-code-img" />
        </div>

        <div class="qr-bank-details">
          <div class="qr-bank-row">
            <span>Ngân hàng:</span>
            <strong>MB Bank (Ngân hàng Quân Đội)</strong>
          </div>
          <div class="qr-bank-row">
            <span>Số tài khoản:</span>
            <strong>0382 610 439 <button type="button" class="qr-copy-chip" onclick="navigator.clipboard.writeText('0382610439');alert('Đã sao chép STK!');">Sao chép</button></strong>
          </div>
          <div class="qr-bank-row">
            <span>Chủ tài khoản:</span>
            <strong>NGUYỄN THỊ LIÊN</strong>
          </div>
          <div class="qr-bank-row">
            <span>Số tiền:</span>
            <strong style="color:var(--green-primary);font-size:1.05rem;">${formatVND(orderAmount)}</strong>
          </div>
          <div class="qr-bank-row">
            <span>Nội dung chuyển khoản:</span>
            <strong>${orderCode} <button type="button" class="qr-copy-chip" onclick="navigator.clipboard.writeText('${orderCode}');alert('Đã sao chép nội dung!');">Sao chép</button></strong>
          </div>
        </div>

        <p style="font-size:0.82rem;color:var(--ink-muted);margin:0 0 16px;">
          Sau khi chuyển khoản thành công trên ứng dụng ngân hàng của bạn, vui lòng bấm nút bên dưới:
        </p>

        <button type="button" class="btn btn-primary btn-full" id="confirmPaidBtn">
          ✓ Xác nhận đã thanh toán
        </button>
      </div>
    `;

    qrModal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Start 10-minute timer (600 seconds)
    let remainSec = 600;
    const countdownEl = document.getElementById('qrCountdown');

    if (qrCountdownTimer) clearInterval(qrCountdownTimer);
    qrCountdownTimer = setInterval(() => {
      remainSec--;
      if (remainSec <= 0) {
        clearInterval(qrCountdownTimer);
        countdownEl.textContent = '00:00 (Hết hạn)';
        countdownEl.style.color = '#B91C1C';
        alert('Đã hết 10 phút thanh toán. Vui lòng thử lại hoặc chọn hình thức COD.');
        qrModal.hidden = true;
        document.body.style.overflow = '';
        return;
      }

      const m = String(Math.floor(remainSec / 60)).padStart(2, '0');
      const s = String(remainSec % 60).padStart(2, '0');
      countdownEl.textContent = `${m}:${s}`;
    }, 1000);

    // Close QR modal button
    document.getElementById('closeQrModal').addEventListener('click', () => {
      clearInterval(qrCountdownTimer);
      qrModal.hidden = true;
      document.body.style.overflow = '';
    });

    // Confirm Paid button
    document.getElementById('confirmPaidBtn').addEventListener('click', () => {
      clearInterval(qrCountdownTimer);
      qrModal.hidden = true;
      showOrderSuccess(orderCode, orderName, orderPhone, orderAddress, orderAmount, 'Chuyển khoản VietQR (Đã xác nhận)');
    });
  }

  // ================= ORDER SUCCESS MODAL =================
  function showOrderSuccess(orderCode, name, phone, address, amount, paymentMethodText) {
    let orderModal = document.getElementById('orderModal');
    if (!orderModal) {
      orderModal = document.createElement('div');
      orderModal.id = 'orderModal';
      orderModal.className = 'modal-backdrop';
      orderModal.setAttribute('role', 'dialog');
      orderModal.setAttribute('aria-modal', 'true');
      document.body.appendChild(orderModal);
    }

    orderModal.innerHTML = `
      <div class="modal-dialog modal-dialog-sm">
        <button class="modal-close" id="closeOrderModal" aria-label="Đóng cửa sổ">&times;</button>
        <div class="order-success-content">
          <div class="success-icon">✓</div>
          <h3 style="margin:0 0 8px;color:var(--green-deep);font-size:1.4rem;">Đặt hàng thành công!</h3>
          <p style="margin:0;color:var(--ink-secondary);font-size:0.92rem;">
            Cảm ơn <strong>${escapeHtml(name)}</strong> đã đồng hành cùng <strong>DATVIET'S FARM</strong> (Dự án Giấm Điều - Nhóm Les Génies, ĐH Thăng Long).
          </p>
          <div class="order-summary-card">
            <div style="margin-bottom:7px;"><strong>Mã đơn hàng:</strong> ${orderCode}</div>
            <div style="margin-bottom:7px;"><strong>Người nhận:</strong> ${escapeHtml(name)} (${escapeHtml(phone)})</div>
            <div style="margin-bottom:7px;"><strong>Địa chỉ:</strong> ${escapeHtml(address)}</div>
            <div style="margin-bottom:7px;"><strong>Thanh toán:</strong> ${paymentMethodText}</div>
            <div style="padding-top:8px;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;">
              <strong>Tổng thanh toán:</strong>
              <strong style="color:var(--green-primary);font-size:1.1rem;">${formatVND(amount)}</strong>
            </div>
            <div style="margin-top:6px;font-size:0.82rem;color:var(--green-primary);">
              Bao bì: Chai nhựa rPET tái chế 100% thân thiện môi trường, đóng hộp xốp bảo vệ chống va đập.
            </div>
          </div>
          <p style="font-size:0.82rem;color:var(--ink-muted);margin:0 0 18px;">
            Nhóm Les Génies sẽ liên hệ xác nhận qua số điện thoại <strong>0382 610 439</strong> trước khi giao qua GHTK / Grab.
          </p>
          <button type="button" class="btn btn-primary btn-full" id="doneOrderBtn">Hoàn tất &amp; Tiếp tục xem</button>
        </div>
      </div>
    `;

    orderModal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Clear cart state
    cartState.items = {};
    cartState.couponCode = '';
    saveState();
    updateHeaderBadge();
    if (typeof renderCartPage === 'function') renderCartPage();

    const closeSuccess = () => {
      orderModal.hidden = true;
      document.body.style.overflow = '';
      window.location.href = 'index.html';
    };

    document.getElementById('closeOrderModal').addEventListener('click', closeSuccess);
    document.getElementById('doneOrderBtn').addEventListener('click', closeSuccess);
  }

  // ================= RECIPE MODAL LOGIC =================
  function openRecipeModal(recipeKey) {
    const r = RECIPES[recipeKey];
    if (!r) return;

    let modal = document.getElementById('recipeModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'recipeModal';
      modal.className = 'modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close" id="closeRecipeModalBtn" aria-label="Đóng cửa sổ">&times;</button>
        <div class="modal-recipe-header">
          <span class="sub-tag">${r.category}</span>
          <h3 style="margin:6px 0 8px;color:var(--green-deep);">${r.title}</h3>
          <div class="recipe-meta">
            <span>Thời gian: <strong>${r.time}</strong></span>
            <span>&bull;</span>
            <span>Định lượng: <strong>${r.dosage}</strong></span>
          </div>
        </div>

        <div style="border-radius:18px;overflow:hidden;margin-bottom:20px;max-height:300px;">
          <img src="${r.image}" alt="${r.title}" style="width:100%;height:100%;object-fit:cover;" />
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
          <button type="button" class="btn btn-primary btn-sm" id="modalBuyVinegar">+ Mua Giấm Điều 500ml</button>
        </div>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
      modal.hidden = true;
      document.body.style.overflow = '';
    };

    document.getElementById('closeRecipeModalBtn').addEventListener('click', closeModal);
    document.getElementById('modalCloseSecondary').addEventListener('click', closeModal);
    document.getElementById('modalBuyVinegar').addEventListener('click', () => {
      addToCart('giam-500', 1);
      closeModal();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ================= AI CHATBOT SYSTEM =================
  const KNOWLEDGE_BASE = [
    {
      keywords: ['chao', 'xin chao', 'hello', 'hi', 'alo', 'ban la ai'],
      answer: 'Xin chào! Tôi là Trợ lý AI của **DATVIET\'S FARM** — dự án Giấm Điều hữu cơ của nhóm **Les Génies** (Trường ĐH Thăng Long). Tôi có thể tư vấn về sản phẩm, quy trình sản xuất, công dụng, món ăn hoặc hỗ trợ bạn đặt hàng ngay hôm nay!'
    },
    {
      keywords: ['nhom', 'les genies', 'thanh vien', 'lien', 'ngan', 'chi', 'thang long', 'cuoc thi', 'ky tich', 'season 5'],
      answer: 'Dự án **Giấm Điều DATVIET\'S FARM** do nhóm **Les Génies** (Lớp QC3703, Trường Đại học Thăng Long, Hà Nội) phát triển, tham dự cuộc thi **Thanglong Business & Marketing Challenge Season 5 — "Kỳ tích"**.\n\n• Nhóm trưởng: Nguyễn Thị Liên (SĐT: 0382 610 439 - nguyenthilientht23@gmail.com)\n• Thành viên: Nguyễn Thị Ngân & Nguyễn Quản Quỳnh Chi.'
    },
    {
      keywords: ['dac biet', 'vuot troi', 'tai sao', 'loi ich', 'so sanh', 'khac gi'],
      answer: 'Giấm Điều DATVIET\'S FARM có 4 điểm vượt trội:\n1. **Zero-Waste:** Lên men tự nhiên 100% từ trái điều chín vốn bị vứt bỏ sau khi thu hoạch hạt (ngành điều VN xuất khẩu 766.585 tấn hạt nhưng lãng phí 90-95% thịt quả).\n2. **Dinh dưỡng cao:** Hàm lượng Vitamin C cao gấp 5 lần cam, giàu Polyphenol chống oxy hóa.\n3. **Probiotic sống:** Lên men sinh học tự nhiên, không axit axetic tổng hợp, không chất bảo quản.\n4. **Bao bì xanh:** Đựng trong chai nhựa rPET tái chế an toàn thực phẩm.'
    },
    {
      keywords: ['gia', 'bao nhieu', 'dung tich', 'chai', '500ml', '1000ml', 'combo'],
      answer: 'Hiện tại DATVIET\'S FARM có 2 dung tích tiện dụng:\n• **Chai 500ml:** 60.000đ (thích hợp dùng thử, detox cá nhân hoặc quà biếu).\n• **Chai 1000ml:** 110.000đ (tiết kiệm 10.000đ, phù hợp cho gia đình & nấu ăn hàng ngày).\n• **Combo Tiết Kiệm (500ml + 1000ml):** Chỉ 160.000đ!'
    },
    {
      keywords: ['giam gia', 'khuyen mai', 'ma', 'coupon', 'mua nhieu'],
      answer: 'DATVIET\'S FARM đang có chính sách ưu đãi mua nhiều siêu hấp dẫn:\n• Mua từ 2 chai: Giảm ngay 5% (Mã: `GIAMDIEU5`)\n• Mua từ 3 chai hoặc đơn từ 200.000đ: Giảm ngay 10% (Mã: `GIAMDIEU10`)\n• Đơn từ 350.000đ: Giảm ngay 15% (Mã: `GIAMDIEU15`)\n• **Freeship toàn nội thành** cho đơn từ 300.000đ!'
    },
    {
      keywords: ['rpet', 'nhua', 'bao bi', 'tai che', 'chai nhua'],
      answer: 'Sản phẩm Giấm Điều được đóng trong **chai nhựa rPET tái chế 100% thân thiện môi trường** (an toàn thực phẩm, không thôi nhiễm, bền nhẹ và giảm phát thải carbon so với nhựa nguyên sinh). Trên mỗi chai đều có tem niêm phong và mã QR truy xuất nguồn gốc.'
    },
    {
      keywords: ['detox', '14 ngay', 'uong', 'cach dung', 'buoi sang'],
      answer: 'Công thức tham gia thử thách **"14 ngày thay đổi hệ tiêu hóa"** cùng Giấm Điều:\n• **15ml Giấm Điều** + **250ml nước ấm (35-40°C)** + **1 thìa mật ong** + **1 thìa hạt chia ngâm nở** + vài lát chanh/bạc hà.\n• Uống mỗi buổi sáng trước bữa ăn 15–20 phút để khởi động hệ vi sinh và hỗ trợ tiêu hóa nhẹ nhàng!'
    },
    {
      keywords: ['mon an', 'nau an', 'cong thuc', 'salad', 'nuoc cham', 'goi cuon', 'kem vani', 'goi ngo sen', 'hai san'],
      answer: 'Giấm Điều rất đa dụng trong ẩm thực:\n1. **Salad nhiệt đới:** Sốt giấm điều mật ong, bơ sáp và xoài tươi.\n2. **Nước chấm healthy:** Thay giấm công nghiệp bằng giấm điều cho gỏi cuốn tôm thơm dịu.\n3. **Kem vani sốt giấm điều:** Cô đặc giấm điều thành sốt caramel rưới lên kem vani cực lạ miệng.\n4. **Gỏi ngó sen:** Ngâm giấm điều giúp ngó sen trắng giòn tự nhiên.\n5. **Hải sản sốt bơ tỏi:** Khử tanh hải sản và làm sáng vị sốt bơ.'
    },
    {
      keywords: ['thanh toan', 'vietqr', 'qr', 'cod', 'chuyen khoan', 'giao hang', 'ship'],
      answer: 'Chúng tôi hỗ trợ 2 hình thức thanh toán:\n• **Thanh toán khi nhận hàng (COD).**\n• **Chuyển khoản VietQR:** Hệ thống tạo mã QR động kèm đồng hồ đếm ngược 10 phút tiện lợi (Ngân hàng MBBank - 0382610439 - Nguyễn Thị Liên).\n• Giao hàng nhanh đóng hộp xốp bảo vệ qua GHTK / Grab, miễn phí ship đơn từ 300.000đ.'
    },
    {
      keywords: ['lien he', 'sdt', 'hotline', 'email', 'dia chi'],
      answer: 'Bạn có thể liên hệ trực tiếp với nhóm Les Génies qua:\n• **Hotline / Zalo:** 0382 610 439 (Nguyễn Thị Liên - Nhóm trưởng)\n• **Email:** nguyenthilientht23@gmail.com\n• **Đơn vị:** Trường Đại học Thăng Long, Nghiêm Xuân Yêm, Hoàng Mai, Hà Nội.'
    }
  ];

  function getAiResponse(query) {
    const clean = query.toLowerCase().trim();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => clean.includes(kw))) {
        return item.answer;
      }
    }
    return 'Cảm ơn câu hỏi của bạn! Sản phẩm **Giấm Điều Hữu Cơ DATVIET\'S FARM** lên men tự nhiên 100% từ trái điều Việt Nam, giàu Vitamin C gấp 5 lần cam và Probiotic có lợi cho đường ruột. Bạn có thể nhấn vào các gợi ý bên dưới hoặc để lại số điện thoại để nhóm Les Génies tư vấn trực tiếp nhé!';
  }

  function initChatbot() {
    if (document.getElementById('chatbotToggle')) return;

    // Chatbot Toggle Pill
    const toggle = document.createElement('button');
    toggle.id = 'chatbotToggle';
    toggle.className = 'chatbot-toggle';
    toggle.setAttribute('aria-label', 'Mở trợ lý AI Giấm Điều');
    toggle.innerHTML = `
      <div class="chatbot-avatar-badge">
        🌱
        <span class="online-dot"></span>
      </div>
      <span>Trợ lý AI Giấm Điều</span>
    `;
    document.body.appendChild(toggle);

    // Chatbot Window
    const win = document.createElement('div');
    win.id = 'chatbotWindow';
    win.className = 'chatbot-window';
    win.hidden = true;
    win.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-avatar">🌱</div>
          <div class="chat-header-text">
            <strong>DATVIET'S FARM AI</strong>
            <span>Đang trực tuyến &bull; Phản hồi 24/7</span>
          </div>
        </div>
        <button class="chat-close-btn" id="closeChatBtn" aria-label="Đóng chat">&times;</button>
      </div>

      <div class="chat-messages" id="chatMessages">
        <div class="chat-bubble bubble-ai">
          Xin chào! Tôi là Trợ lý AI của <strong>DATVIET'S FARM</strong> (Dự án Giấm Điều - Nhóm Les Génies, ĐH Thăng Long). Tôi có thể giúp bạn tìm hiểu sản phẩm, công thức món ăn hoặc hướng dẫn đặt hàng!
        </div>
      </div>

      <div class="chat-chips-area" id="chatChipsArea">
        <button type="button" class="chat-chip" data-query="Giấm điều có gì vượt trội?">🌿 Giấm điều có gì vượt trội?</button>
        <button type="button" class="chat-chip" data-query="Thử thách 14 ngày detox dùng thế nào?">🥤 Cách dùng Detox 14 ngày</button>
        <button type="button" class="chat-chip" data-query="Giá bán và các mã giảm giá?">💰 Giá bán &amp; Mã giảm giá</button>
        <button type="button" class="chat-chip" data-query="Chai nhựa rPET là gì?">♻️ Chai nhựa rPET</button>
        <button type="button" class="chat-chip" data-query="Gợi ý món ăn ngon từ giấm điều?">🥗 Gợi ý món ngon</button>
        <button type="button" class="chat-chip" data-query="Thông tin nhóm Les Génies?">🎓 Nhóm Les Génies</button>
      </div>

      <form class="chat-input-area" id="chatForm">
        <input type="text" id="chatInput" placeholder="Nhập câu hỏi của bạn..." autocomplete="off" />
        <button type="submit" class="chat-send-btn" aria-label="Gửi tin nhắn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    `;
    document.body.appendChild(win);

    const messagesContainer = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatForm = document.getElementById('chatForm');
    const closeBtn = document.getElementById('closeChatBtn');

    toggle.addEventListener('click', () => {
      win.hidden = !win.hidden;
      if (!win.hidden) {
        setTimeout(() => chatInput.focus(), 150);
      }
    });

    closeBtn.addEventListener('click', () => {
      win.hidden = true;
    });

    function appendUserMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble bubble-user';
      bubble.textContent = text;
      messagesContainer.appendChild(bubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendAiMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble bubble-ai';
      // Simple markdown parser for bold, lists, and linebreaks
      const formatted = escapeHtml(text)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(69,97,48,0.1);padding:2px 5px;border-radius:4px;color:var(--green-deep);font-weight:700;">$1</code>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');

      bubble.innerHTML = formatted;
      messagesContainer.appendChild(bubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleSend(userText) {
      if (!userText.trim()) return;
      appendUserMessage(userText);
      chatInput.value = '';

      // Typing indicator simulation
      const typing = document.createElement('div');
      typing.className = 'chat-bubble bubble-ai';
      typing.id = 'chatTyping';
      typing.textContent = 'Đang soạn phản hồi...';
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        typing.remove();
        const reply = getAiResponse(userText);
        appendAiMessage(reply);
      }, 420);
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend(chatInput.value);
    });

    document.getElementById('chatChipsArea').addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-chip');
      if (chip && chip.dataset.query) {
        handleSend(chip.dataset.query);
      }
    });
  }

  // ================= GLOBAL EVENT LISTENERS =================
  document.addEventListener('DOMContentLoaded', () => {
    updateHeaderBadge();
    initChatbot();

    // Sticky header shadow
    const header = document.getElementById('siteHeader');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 18);
      }, { passive: true });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Add to cart buttons everywhere
    document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, 1);
      });
    });

    // Recipe modal triggers
    document.querySelectorAll('.recipe-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openRecipeModal(btn.dataset.recipe);
      });
    });

    // Recipe category filters (on cong-dung.html)
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

    // Scroll reveal animations
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

    // Cart page specific bindings (gio-hang.html)
    const cartItemsList = document.getElementById('cartItemsList');
    if (cartItemsList) {
      renderCartPage();

      // Qty adjustments & remove
      cartItemsList.addEventListener('click', (e) => {
        const target = e.target.closest('button[data-action]');
        if (!target) return;
        const { action, id } = target.dataset;
        const current = cartState.items[id] || 0;

        if (action === 'inc') {
          cartState.items[id] = current + 1;
        } else if (action === 'dec') {
          if (current <= 1) delete cartState.items[id];
          else cartState.items[id] = current - 1;
        } else if (action === 'remove') {
          delete cartState.items[id];
        }

        saveState();
        updateHeaderBadge();
        renderCartPage();
      });

      // Clear cart
      const clearCartBtn = document.getElementById('clearCartBtn');
      if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
          cartState.items = {};
          saveState();
          updateHeaderBadge();
          renderCartPage();
          showToast('Đã làm trống giỏ hàng.');
        });
      }

      // Coupon Form & Quick Tags
      const couponForm = document.getElementById('couponForm');
      const couponInput = document.getElementById('couponInput');
      if (couponForm && couponInput) {
        couponForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const code = couponInput.value.trim().toUpperCase();
          cartState.couponCode = code;
          saveState();
          renderCartPage();
          showToast(`Đã áp dụng mã: ${code}`);
        });

        document.querySelectorAll('.coupon-tag-btn').forEach((tag) => {
          tag.addEventListener('click', () => {
            const code = tag.dataset.code;
            couponInput.value = code;
            cartState.couponCode = code;
            saveState();
            renderCartPage();
            showToast(`Đã áp dụng mã: ${code}`);
          });
        });
      }

      // Checkout submit
      const checkoutForm = document.getElementById('checkoutForm');
      if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const totals = computeTotals();
          if (totals.itemCount === 0) {
            showToast('Giỏ hàng đang trống. Vui lòng chọn sản phẩm trước.');
            return;
          }

          const name = document.getElementById('customerName').value.trim();
          const phone = document.getElementById('customerPhone').value.trim();
          const address = document.getElementById('customerAddress').value.trim();
          const payment = document.getElementById('paymentMethod').value;

          if (!name || !phone || !address) {
            showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ.');
            return;
          }

          const orderCode = 'DVF-' + Math.floor(100000 + Math.random() * 900000);

          if (payment === 'QR') {
            // Launch VietQR with 10-minute timer modal
            startVietQRModal(orderCode, name, phone, address, totals.total);
          } else {
            // COD direct checkout
            showOrderSuccess(orderCode, name, phone, address, totals.total, 'Thanh toán khi nhận hàng (COD)');
          }
        });
      }
    }
  });

  // Expose global methods for inline HTML buttons
  window.DATVIETS_FARM = {
    addToCart,
    openRecipeModal
  };
})();
