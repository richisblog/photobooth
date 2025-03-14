// 初始化摄像头访问
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: 1920,
        height: 1080
      }, 
      audio: false 
    });
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.style.transform = 'scaleX(-1)';
  } catch(err) {
    console.error('摄像头访问失败:', err);
  }
}

// 拍照功能
function takePhoto() {
  const canvas = document.createElement('canvas');
  const video = document.getElementById('video');
  canvas.width = 1920;
  canvas.height = 1080;
  canvas.getContext('2d').drawImage(video, 0, 0, 1920, 1080);

  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  img.className = 'thumbnail';
  img.onclick = () => window.open(img.src);
  
  document.getElementById('thumbnails').prepend(img);
}

// 连拍4张
function burstShot() {
  let count = 4;
  const shoot = () => {
    takePhoto();
    if(--count > 0) setTimeout(shoot, 500);
  };
  shoot();
}

// 延迟5秒拍摄
function delayedShot() {
  let seconds = 5;
  const countdown = document.getElementById('countdown-display');
  countdown.textContent = seconds;

  const interval = setInterval(() => {
    countdown.textContent = --seconds;
    if(seconds <= 0) {
      clearInterval(interval);
      takePhoto();
      countdown.textContent = '';
    }
  }, 1000);
}

// 镜像翻转
function toggleMirror() {
  const video = document.getElementById('video');
  video.style.transform = video.style.transform === 'scaleX(-1)' ? '' : 'scaleX(-1)';
}

// 初始化
window.onload = initCamera;