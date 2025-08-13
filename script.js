// スムーススクロール機能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // モバイルメニューを閉じる
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        if (mobileMenu && hamburger) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ハンバーガーメニューの動作
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// ヘッダーの背景透明度調整
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// インタラクション時のアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// セクション要素にアニメーションを適用
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const benefitItems = document.querySelectorAll('.benefit-item');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // 初期状態を設定
    [...sections, ...benefitItems, ...faqItems].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});

// FAQのタブ切り替え機能
document.querySelectorAll('.faq-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabNumber = this.getAttribute('data-tab');
        
        // すべてのタブとコンテンツから active クラスを削除
        document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('active'));
        
        // クリックされたタブと対応するコンテンツに active クラスを追加
        this.classList.add('active');
        document.querySelector(`.faq-content[data-content="${tabNumber}"]`).classList.add('active');
    });
});

// ボタンのクリックアニメーション
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // リップル効果の実装
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// リップルアニメーションのCSSを動的に追加
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    
`;
document.head.appendChild(style);

// モバイルナビゲーションの処理（必要に応じて）
function handleMobileNav() {
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header');
    
    if (window.innerWidth <= 768) {
        header.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                // モバイルでナビゲーションリンクをクリックした場合の処理
                setTimeout(() => {
                    if (navList.classList.contains('mobile-open')) {
                        navList.classList.remove('mobile-open');
                    }
                }, 100);
            }
        });
    }
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', handleMobileNav);

// 初期化
handleMobileNav();

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // 初期アニメーションの実行
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// モーダルの処理
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');
const privacyLink = document.getElementById('privacy-link');
const termsLink = document.getElementById('terms-link');
const closeButtons = document.getElementsByClassName('close');

// プライバシーポリシーモーダルを開く
privacyLink.addEventListener('click', function(e) {
    e.preventDefault();
    privacyModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// 利用規約モーダルを開く
termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    termsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// モーダルを閉じる
for (let closeButton of closeButtons) {
    closeButton.addEventListener('click', function() {
        privacyModal.style.display = 'none';
        termsModal.style.display = 'none';
        document.body.style.overflow = '';
    });
}

// モーダル外をクリックして閉じる
window.addEventListener('click', function(e) {
    if (e.target === privacyModal) {
        privacyModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (e.target === termsModal) {
        termsModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// フォーム送信の処理（実際の実装時に使用）
function handleFormSubmit(formData) {
    // ここに実際のフォーム送信処理を実装
    console.log('フォームデータ:', formData);
    
    // 成功メッセージの表示
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4a90e2;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-weight: bold;
        ">
            お問い合わせありがとうございます！
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
} 