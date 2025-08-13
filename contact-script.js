// Contact page specific JavaScript

// ハンバーガーメニューの動作
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// フォームの送信処理
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // チェックボックスなど複数値の場合
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // チェックボックスの検証
        const checkboxes = document.querySelectorAll('input[name="inquiry-type"]:checked');
        if (checkboxes.length === 0) {
            alert('お問い合わせ種別を少なくとも1つ選択してください。');
            return;
        }
        
        // ここで実際の送信処理を行う
        console.log('送信データ:', data);
        
        // 成功メッセージの表示
        showSuccessMessage();
        
        // フォームをリセット
        contactForm.reset();
    });
}

// 成功メッセージの表示
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <h3>お問い合わせありがとうございます</h3>
            <p>内容を確認次第、担当者よりご連絡させていただきます。</p>
            <button onclick="this.parentElement.parentElement.remove()">閉じる</button>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // 5秒後に自動的に削除
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// モーダルの処理
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');
const privacyLinks = document.querySelectorAll('#privacy-link, #privacy-link-footer');
const termsLinks = document.querySelectorAll('#terms-link-footer');
const closeButtons = document.getElementsByClassName('close');

// プライバシーポリシーモーダルを開く
privacyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// 利用規約モーダルを開く
termsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
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

// スタイルを動的に追加（成功メッセージ用）
const style = document.createElement('style');
style.textContent = `
    .success-message {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .success-content {
        background: #fff;
        padding: 50px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        border: 3px solid #000;
        animation: scaleIn 0.3s ease;
    }
    
    .success-content h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #000;
        white-space: nowrap;
    }
    
    .success-content p {
        font-size: 14px;
        color: #666;
        margin-bottom: 30px;
        line-height: 1.8;
        white-space: nowrap;
    }
    
    .success-content button {
        background: #000;
        color: #fff;
        border: none;
        padding: 15px 40px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .success-content button:hover {
        background: #333;
        transform: translateY(-2px);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);