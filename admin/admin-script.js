// 認証情報
const AUTH_CREDENTIALS = {
    username: 'admin',
    password: 'hataraku_ai'
};

// ストレージキー
const STORAGE_KEYS = {
    isLoggedIn: 'adminLoggedIn',
    loginTime: 'adminLoginTime',
    inquiries: 'inquiries'
};

// ログインページの処理
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
            // ログイン成功
            localStorage.setItem(STORAGE_KEYS.isLoggedIn, 'true');
            localStorage.setItem(STORAGE_KEYS.loginTime, new Date().toISOString());
            window.location.href = 'dashboard.html';
        } else {
            // ログイン失敗
            errorMessage.textContent = 'ユーザー名またはパスワードが正しくありません。';
            loginForm.reset();
            document.getElementById('username').focus();
        }
    });
}

// ダッシュボードページの処理
if (document.querySelector('.dashboard-page')) {
    // ログインチェック
    checkAuth();
    
    // サイドバーナビゲーション
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // アクティブクラスの切り替え
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // セクションの表示切り替え
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // ログアウト処理
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('ログアウトしますか？')) {
            localStorage.removeItem(STORAGE_KEYS.isLoggedIn);
            localStorage.removeItem(STORAGE_KEYS.loginTime);
            window.location.href = 'login.html';
        }
    });
    
    // お問い合わせデータの初期化
    initializeInquiries();
    
    // 更新ボタン
    document.getElementById('refreshBtn').addEventListener('click', function() {
        loadInquiries();
    });
    
    // 最終ログイン時刻の表示
    const loginTime = localStorage.getItem(STORAGE_KEYS.loginTime);
    if (loginTime) {
        document.getElementById('lastLogin').textContent = formatDateTime(new Date(loginTime));
    }
}

// 認証チェック
function checkAuth() {
    const isLoggedIn = localStorage.getItem(STORAGE_KEYS.isLoggedIn);
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// お問い合わせデータの初期化
function initializeInquiries() {
    // サンプルデータがない場合は初期データを設定
    let inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.inquiries) || '[]');
    
    if (inquiries.length === 0) {
        // サンプルデータ
        inquiries = [
            {
                id: 1,
                date: '2025-01-10 14:30',
                company: '株式会社テスト',
                department: '人事部',
                name: '山田太郎',
                kana: 'ヤマダタロウ',
                email: 'yamada@test.co.jp',
                phone: '03-1234-5678',
                types: ['AI勤怠管理くんについて', '無料トライアルについて'],
                message: 'AI勤怠管理くんの導入を検討しています。まずは無料トライアルから始めたいのですが、申し込み方法を教えてください。',
                status: 'unread'
            },
            {
                id: 2,
                date: '2025-01-09 10:15',
                company: 'サンプル商事株式会社',
                department: '総務部',
                name: '鈴木花子',
                kana: 'スズキハナコ',
                email: 'suzuki@sample.co.jp',
                phone: '03-9876-5432',
                types: ['AI給与計算くんについて', 'お見積りについて'],
                message: '従業員50名規模での導入を検討しています。お見積りをいただけますでしょうか。',
                status: 'processing'
            },
            {
                id: 3,
                date: '2025-01-08 16:45',
                company: 'デモ工業株式会社',
                department: '経理部',
                name: '佐藤次郎',
                kana: 'サトウジロウ',
                email: 'sato@demo.co.jp',
                phone: '03-5555-5555',
                types: ['その他'],
                message: '既存の給与システムからのデータ移行は可能でしょうか？',
                status: 'completed'
            }
        ];
        localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries));
    }
    
    loadInquiries();
}

// お問い合わせデータの読み込み
function loadInquiries() {
    const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.inquiries) || '[]');
    const tableBody = document.getElementById('inquiryTableBody');
    
    // テーブルの更新
    tableBody.innerHTML = '';
    inquiries.forEach(inquiry => {
        const row = createInquiryRow(inquiry);
        tableBody.appendChild(row);
    });
    
    // 最終更新時刻
    document.getElementById('lastUpdated').textContent = formatDateTime(new Date());
}

// お問い合わせ行の作成
function createInquiryRow(inquiry) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${inquiry.date}</td>
        <td>${inquiry.company}</td>
        <td>${inquiry.name}</td>
        <td>${inquiry.types.join(', ')}</td>
        <td>
            <button class="btn-view" onclick="viewInquiry(${inquiry.id})">詳細</button>
            <button class="btn-delete" onclick="deleteInquiry(${inquiry.id})">削除</button>
        </td>
    `;
    return row;
}

// ステータステキストの取得
function getStatusText(status) {
    const statusMap = {
        'unread': '未対応',
        'processing': '対応中',
        'completed': '完了'
    };
    return statusMap[status] || status;
}


// お問い合わせ詳細の表示
function viewInquiry(id) {
    const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.inquiries) || '[]');
    const inquiry = inquiries.find(i => i.id === id);
    
    if (!inquiry) return;
    
    const modal = document.getElementById('inquiryModal');
    const detailContainer = document.getElementById('inquiryDetail');
    
    // 詳細情報の表示
    detailContainer.innerHTML = `
        <div class="detail-row">
            <div class="detail-label">受信日時</div>
            <div class="detail-value">${inquiry.date}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">会社名</div>
            <div class="detail-value">${inquiry.company}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">部署名</div>
            <div class="detail-value">${inquiry.department || '-'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">お名前</div>
            <div class="detail-value">${inquiry.name} (${inquiry.kana})</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">メールアドレス</div>
            <div class="detail-value">${inquiry.email}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">電話番号</div>
            <div class="detail-value">${inquiry.phone || '-'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">お問い合わせ種別</div>
            <div class="detail-value">${inquiry.types.join(', ')}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">お問い合わせ内容</div>
            <div class="detail-value">${inquiry.message}</div>
        </div>
    `;
    
    // モーダルを表示
    modal.style.display = 'block';
}

// モーダルを閉じる
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('inquiryModal').style.display = 'none';
});

window.addEventListener('click', function(e) {
    const modal = document.getElementById('inquiryModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 日時フォーマット
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

// お問い合わせの削除
function deleteInquiry(id) {
    if (confirm('このお問い合わせを削除してもよろしいですか？')) {
        let inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.inquiries) || '[]');
        inquiries = inquiries.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries));
        loadInquiries();
    }
}