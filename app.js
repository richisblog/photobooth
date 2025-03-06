// 初始化摄像头访问
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('video');
        video.srcObject = stream;
    } catch(err) {
        console.error('摄像头访问失败:', err);
        alert('无法访问摄像头，请检查设备权限设置');
    }
}

// 创建缩略图
function createThumbnail(dataUrl) {
    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'thumbnail';
    document.getElementById('thumbnails').appendChild(img);
}

// 拍照功能
function takePhoto() {
    const video = document.getElementById('video');
    video.style.transform = 'scaleX(-1)';
    createThumbnail(video.toDataURL('image/jpeg'));
}

// 镜像切换功能
function toggleMirror() {
    const video = document.getElementById('video');
    video.style.transform = video.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
}

// 连拍功能
function burstShot() {
    let count = 0;
    const interval = setInterval(() => {
        takePhoto();
        if(++count >= 4) clearInterval(interval);
    }, 300);
}

// 延迟拍摄
function delayedShot() {
    const buttons = document.querySelectorAll('.controls button');
    buttons.forEach(btn => btn.disabled = true);
    let countdown = 5;
    const countdownDisplay = document.getElementById('countdown-display');
    
    countdownDisplay.textContent = countdown;
    
    const interval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        
        if(countdown <= 0) {
            clearInterval(interval);
            takePhoto();
            buttons.forEach(btn => btn.disabled = false);
            countdownDisplay.textContent = '';
        }
    }, 1000);
}

// 页面加载后初始化
window.addEventListener('load', initCamera);