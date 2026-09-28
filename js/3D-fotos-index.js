/*
Base Code Credit: Special thanks to Nemanja Kočović for the foundational code and inspiration. The original base accessible at: https://codepen.io/thingbynemanja/pen/qEbxvmz
*/

const cardsData = [{
    title: 'El Señor de los Anillos',
    comment: "...",
    image: "img/elSeñorHor.jpg",       // Локальное сжатое фото для карусели
    highResImage: "img/elSeñorHor.jpg", // Локальный оригинал для полного экрана
    credit: '...'
}, {
    title: 'Avatar',
    comment: "...",
    image: "img/avatarHor.jpg",
    highResImage: "img/avatarHor.jpg",
    credit: '...'
}, {
    title: 'Coco',
    comment: "...",
    image: "img/cocoHor.jpg",
    highResImage: "img/cocoHor.jpg",
    credit: '...'
}, {
    title: 'F1',
    comment: "...",
    image: "img/F1-gor.jpg",
    highResImage: "img/F1-gor.jpg",
    credit: '...'
}, {
    title: 'Interestellar',
    comment: "...",
    image: "img/interestellarhoriz.jpg",
    highResImage: "img/interestellarhoriz.jpg",
    credit: '...'
}, {
    title: 'Joker',
    comment: "...",
    image: "img/jokerHor.jpg",
    highResImage: "img/jokerHor.jpg",
    credit: '...'
}, {
    title: 'La La Land',
    comment: "...",
    image: "img/lalalandHor.jpg",
    highResImage: "img/lalalandHor.jpg",
    credit: '...'
}, {
    title: 'Michael Jackson',
    comment: "...",
    image: "img/michael-gor.jpg",
    highResImage: "img/michael-gor.jpg",
    credit: '...'
}, {
    title: 'Spider-Man',
    comment: "...",
    image: "img/spider-nan-gor.jpg",
    highResImage: "img/spider-nan-gor.jpg",
    credit: '...'
}];

    
const track = document.getElementById('track');
const viewport = document.getElementById('viewport');
const loader = document.getElementById('loader');
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenContainer = document.getElementById('fullscreenContainer');
const fullscreenImageWrapper = document.getElementById('fullscreenImageWrapper');
const fullscreenImage = document.getElementById('fullscreenImage');
const fullscreenTitle = document.getElementById('fullscreenTitle');
const fullscreenComment = document.getElementById('fullscreenComment');
const fullscreenCredit = document.getElementById('fullscreenCredit');
const closeButton = document.getElementById('closeButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const imageCounter = document.getElementById('imageCounter');
const highResCache = new Map();
console.log("&Toc on codepen - https://codepen.io/ol-ivier");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
const RENDER_DISTANCE = isMobile ? 1.8 : 2.5;
const CLONE_COUNT = isMobile ? 2 : 3;
const PARALLAX_INTENSITY = isMobile ? 20 : 40;
const friction = isMobile ? 0.92 : 0.96;
const wheelMultiplier = isMobile ? 0.08 : 0.25;
const lerpSpeed = isMobile ? 0.12 : 0.18;
const DRAG_THRESHOLD = 5;
const VELOCITY_THRESHOLD = 0.001;
const POSITION_THRESHOLD = 0.01;
let cardData = [];
let originalCount = cardsData.length;
let currentImageIndex = 0;
let isInitialized = !1;
let imagesLoaded = 0;
let totalImages = 0;
let itemW = 0;
let totalWidth = 0;
let visibleCenterX = 0;
let viewportWidth = 0;
let position = 0;
let velocity = 0;
let smoothPos = 0;
let isDragging = !1;
let hasDragged = !1;
let pointerId = null;
let dragStartX = 0;
let dragStartY = 0;
let lastPointerX = 0;
let dragStartTime = 0;
let lastTime = 0;
let rafId = null;
let wheelAnimationFrame = null;
let targetVelocity = 0;

function toggleBrowserFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = fullscreenContainer;
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
}

function loadHighResImage(index, forceReload = !1) {
    const data = cardsData[index];
    if (!data.highResImage) {
        if (fullscreenImage.src !== data.image) {
            fullscreenImage.src = data.image
        }
        return Promise.resolve(data.image)
    }
    if (!forceReload && highResCache.has(data.highResImage)) {
        const cachedImg = highResCache.get(data.highResImage);
        if (cachedImg.complete && cachedImg.naturalWidth > 0) {
            fullscreenImage.src = data.highResImage;
            return Promise.resolve(data.highResImage)
        }
    }
    if (fullscreenImage.src !== data.image) {
        fullscreenImage.src = data.image
    }
    fullscreenImageWrapper.classList.add('loading');
    fullscreenImage.classList.add('loading');
    return new Promise((resolve, reject) => {
        const highResImg = new Image();
        highResImg.onload = () => {
            highResCache.set(data.highResImage, highResImg);
            fullscreenImage.src = data.highResImage;
            fullscreenImageWrapper.classList.remove('loading');
            fullscreenImage.classList.remove('loading');
            resolve(data.highResImage)
        };
        highResImg.onerror = () => {
            console.warn(`Impossible de charger l'image HD: ${data.highResImage}`);
            fullscreenImageWrapper.classList.remove('loading');
            fullscreenImage.classList.remove('loading');
            reject(new Error('Failed to load high-res image'))
        };
        highResImg.src = data.highResImage
    })
}

function preloadNextImage(index) {
    const nextIndex = (index + 1) % originalCount;
    const nextData = cardsData[nextIndex];
    if (nextData && nextData.highResImage && !highResCache.has(nextData.highResImage)) {
        const preloadImg = new Image();
        preloadImg.src = nextData.highResImage;
        highResCache.set(nextData.highResImage, preloadImg)
    }
    const prevIndex = (index - 1 + originalCount) % originalCount;
    const prevData = cardsData[prevIndex];
    if (prevData && prevData.highResImage && !highResCache.has(prevData.highResImage)) {
        const preloadImg = new Image();
        preloadImg.src = prevData.highResImage;
        highResCache.set(prevData.highResImage, preloadImg)
    }
}

function createCard(data, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-title', data.title);
    card.setAttribute('data-comment', data.comment);
    card.setAttribute('data-credit', data.credit || '');
    card.setAttribute('data-index', index);
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.title;
    img.loading = 'eager';
    totalImages++;
    img.onload = () => {
        img.classList.add('loaded');
        imagesLoaded++;
        updateLoaderProgress()
    };
    img.onerror = () => {
        imagesLoaded++;
        updateLoaderProgress()
    };
    inner.appendChild(img);
    card.appendChild(inner);
    return card
}

function updateLoaderProgress() {
    if (imagesLoaded === totalImages && totalImages > 0) {
        setTimeout(() => {
            loader.classList.add('hidden');
            viewport.classList.add('visible');
            setTimeout(() => {
                updateMetrics();
                setInitialPosition();
                renderImmediate()
            }, 100)
        }, 500)
    } else {
        const percent = Math.round((imagesLoaded / totalImages) * 100);
        const loaderText = document.querySelector('.loader-text');
        if (loaderText) {
            loaderText.textContent = `Chargement des images... ${percent}%`
        }
    }
}

function buildTrack() {
    track.innerHTML = '';
    imagesLoaded = 0;
    totalImages = 0;
    for (let i = 0; i < CLONE_COUNT; i++) {
        cardsData.forEach((data, idx) => {
            const card = createCard(data, idx);
            track.appendChild(card)
        })
    }
}

function getItemWidth() {
    if (cardData.length === 0) return 0;
    const style = getComputedStyle(cardData[0].el);
    return cardData[0].el.offsetWidth + parseFloat(style.marginRight || 0)
}

function updateMetrics() {
    if (cardData.length === 0) return;
    itemW = getItemWidth();
    totalWidth = itemW * cardData.length;
    viewportWidth = window.innerWidth;
    visibleCenterX = viewportWidth * 0.5
}

function setInitialPosition() {
    let firstOriginalIndex = -1;
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i].originalIndex === 0) {
            firstOriginalIndex = i;
            break
        }
    }
    if (firstOriginalIndex !== -1) {
        const targetCardCenter = firstOriginalIndex * itemW + (itemW / 2);
        const targetPosition = targetCardCenter - visibleCenterX;
        position = targetPosition;
        smoothPos = targetPosition
    }
}

function renderImmediate() {
    if (cardData.length === 0 || !isInitialized) return;
    const halfTotalWidth = totalWidth * 0.5;
    const centerX = visibleCenterX;
    const basePos = -smoothPos;
    for (let i = 0; i < cardData.length; i++) {
        const data = cardData[i];
        const card = data.el;
        const img = data.img;
        let baseX = i * itemW + basePos;
        let wrappedX = ((baseX + halfTotalWidth) % totalWidth + totalWidth) % totalWidth - halfTotalWidth;
        const finalX = wrappedX + centerX;
        const cardCenter = finalX + itemW * 0.5;
        const distanceFactor = (cardCenter - centerX) / viewportWidth;
        const absDist = Math.abs(distanceFactor);
        const t = Math.min(1, absDist);
        const scale = 1 - t * 0.35;
        const rotateY = distanceFactor * 22;
        const translateZ = -absDist * 70;
        const opacityVal = 1 - t * 0.7;
        card.style.transform = `translate3d(${finalX}px, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
        card.style.opacity = opacityVal;
        card.style.pointerEvents = opacityVal < 0.3 ? 'none' : 'auto';
        if (img && opacityVal > 0.3 && img.complete) {
            const parallaxX = distanceFactor * PARALLAX_INTENSITY;
            const parallaxScale = 1 + t * 0.05;
            img.style.transform = `translate3d(${parallaxX}px, 0, 0) scale(${parallaxScale})`
        }
    }
}

function openFullscreen(index) {
    currentImageIndex = index;
    fullscreenImage.src = cardsData[index].image;
    fullscreenTitle.textContent = cardsData[index].title;
    fullscreenComment.textContent = cardsData[index].comment;
    if (cardsData[index].credit) {
        fullscreenCredit.innerHTML = cardsData[index].credit;
        fullscreenCredit.style.display = 'block'
    } else {
        fullscreenCredit.style.display = 'none'
    }
    imageCounter.textContent = `${index + 1} / ${originalCount}`;
    fullscreenOverlay.classList.add('active');
    document.body.classList.add('fullscreen-mode');
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null
    }
    fullscreenComment.scrollTop = 0;
    loadHighResImage(index).catch(() => {
        console.log('Utilisation de l\'image standard')
    });
    preloadNextImage(index)
}

function closeFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
    fullscreenOverlay.classList.remove('active');
    document.body.classList.remove('fullscreen-mode');
    if (!rafId && isInitialized) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate)
    }
}

function navigateFullscreen(direction) {
    currentImageIndex = (currentImageIndex + direction + originalCount) % originalCount;
    fullscreenImage.src = cardsData[currentImageIndex].image;
    fullscreenTitle.textContent = cardsData[currentImageIndex].title;
    fullscreenComment.textContent = cardsData[currentImageIndex].comment;
    if (cardsData[currentImageIndex].credit) {
        fullscreenCredit.innerHTML = cardsData[currentImageIndex].credit;
        fullscreenCredit.style.display = 'block'
    } else {
        fullscreenCredit.style.display = 'none'
    }
    imageCounter.textContent = `${currentImageIndex + 1} / ${originalCount}`;
    fullscreenComment.scrollTop = 0;
    loadHighResImage(currentImageIndex).catch(() => {
        console.log('Utilisation de l\'image standard')
    });
    preloadNextImage(currentImageIndex)
}

function animate(currentTime) {
    rafId = requestAnimationFrame(animate);
    if (!isInitialized) return;
    if (!isDragging && Math.abs(velocity) < VELOCITY_THRESHOLD && Math.abs(position - smoothPos) < POSITION_THRESHOLD) {
        return
    }
    if (cardData.length === 0) return;
    lastTime = currentTime;
    if (!isDragging) {
        position += velocity;
        velocity *= friction;
        if (Math.abs(velocity) < VELOCITY_THRESHOLD) velocity = 0
    }
    smoothPos += (position - smoothPos) * lerpSpeed;
    const halfTotalWidth = totalWidth * 0.5;
    const centerX = visibleCenterX;
    const maxDist = RENDER_DISTANCE;
    const parallaxIntensity = PARALLAX_INTENSITY;
    const basePos = -smoothPos;
    const viewportW = viewportWidth;
    for (let i = 0; i < cardData.length; i++) {
        const data = cardData[i];
        const card = data.el;
        const img = data.img;
        let baseX = i * itemW + basePos;
        let wrappedX = ((baseX + halfTotalWidth) % totalWidth + totalWidth) % totalWidth - halfTotalWidth;
        const finalX = wrappedX + centerX;
        const cardCenter = finalX + itemW * 0.5;
        const distanceFactor = (cardCenter - centerX) / viewportW;
        const absDist = Math.abs(distanceFactor);
        if (absDist > maxDist) {
            if (card.style.opacity !== '0') {
                card.style.opacity = '0';
                card.style.pointerEvents = 'none'
            }
            continue
        }
        const t = Math.min(1, absDist);
        const scale = 1 - t * 0.35;
        const rotateY = distanceFactor * 22;
        const translateZ = -absDist * 70;
        const opacityVal = 1 - t * 0.7;
        card.style.transform = `translate3d(${finalX}px, 0, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
        card.style.opacity = opacityVal;
        card.style.pointerEvents = opacityVal < 0.3 ? 'none' : 'auto';
        if (img && opacityVal > 0.3 && img.complete) {
            const parallaxX = distanceFactor * parallaxIntensity;
            const parallaxScale = 1 + t * 0.05;
            img.style.transform = `translate3d(${parallaxX}px, 0, 0) scale(${parallaxScale})`
        }
    }
}

function onWheel(e) {
    e.preventDefault();
    if (!isMobile) {
        const delta = e.deltaY;
        targetVelocity += delta * wheelMultiplier;
        const maxVel = isMobile ? 12 : 35;
        targetVelocity = Math.min(Math.max(targetVelocity, -maxVel), maxVel);
        velocity = targetVelocity;
        if (wheelAnimationFrame) cancelAnimationFrame(wheelAnimationFrame);
        const decelerate = () => {
            targetVelocity *= 0.96;
            velocity = targetVelocity;
            if (Math.abs(targetVelocity) > 0.5) {
                wheelAnimationFrame = requestAnimationFrame(decelerate)
            } else {
                targetVelocity = 0;
                wheelAnimationFrame = null
            }
        };
        wheelAnimationFrame = requestAnimationFrame(decelerate)
    } else {
        velocity += e.deltaY * wheelMultiplier;
        const maxVel = 12;
        velocity = Math.min(Math.max(velocity, -maxVel), maxVel)
    }
}

function onPointerDown(e) {
    e.preventDefault();
    pointerId = e.pointerId;
    isDragging = !0;
    hasDragged = !1;
    targetVelocity = 0;
    if (wheelAnimationFrame) {
        cancelAnimationFrame(wheelAnimationFrame);
        wheelAnimationFrame = null
    }
    lastPointerX = e.clientX;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStartTime = performance.now();
    velocity = 0;
    viewport.classList.add('dragging');
    viewport.setPointerCapture(pointerId)
}

function onPointerMove(e) {
    if (!isDragging || e.pointerId !== pointerId) return;
    const dx = e.clientX - lastPointerX;
    const dragDistance = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
    if (dragDistance > DRAG_THRESHOLD) {
        hasDragged = !0
    }
    position -= dx;
    lastPointerX = e.clientX
}

function onPointerUp(e) {
    if (!isDragging || e.pointerId !== pointerId) return;
    viewport.classList.remove('dragging');
    viewport.releasePointerCapture(pointerId);
    const dt = Math.max(0.016, (performance.now() - dragStartTime) / 1000);
    if (dt > 0 && hasDragged) {
        const finalDx = e.clientX - dragStartX;
        let v = -(finalDx / dt) * (isMobile ? 0.018 : 0.028);
        const maxVelocity = isMobile ? 18 : 40;
        velocity = Math.min(Math.max(v, -maxVelocity), maxVelocity)
    } else {
        velocity = 0
    }
    isDragging = !1;
    pointerId = null
}

function cacheCardData() {
    const cards = Array.from(track.children);
    cardData = cards.map((card, idx) => ({
        el: card,
        img: card.querySelector('img'),
        originalIndex: idx % originalCount
    }))
}
async function init() {
    buildTrack();
    cacheCardData();
    const checkInterval = setInterval(() => {
        if (imagesLoaded === totalImages && totalImages > 0) {
            clearInterval(checkInterval);
            updateMetrics();
            setInitialPosition();
            renderImmediate();
            isInitialized = !0;
            cardData.forEach((data) => {
                data.el.addEventListener('click', (e) => {
                    if (hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        hasDragged = !1;
                        return
                    }
                    openFullscreen(data.originalIndex)
                })
            });
            lastTime = performance.now();
            rafId = requestAnimationFrame(animate)
        }
    }, 50);
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('wheel', onWheel, {
        passive: !1
    });
    viewport.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('resize', () => {
        if (isInitialized) {
            updateMetrics();
            setInitialPosition();
            renderImmediate()
        }
    });
    closeButton.addEventListener('click', closeFullscreen);
    prevButton.addEventListener('click', () => navigateFullscreen(-1));
    nextButton.addEventListener('click', () => navigateFullscreen(1));
    fullscreenImageWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBrowserFullscreen()
    });
    document.addEventListener('keydown', (e) => {
        if (fullscreenOverlay.classList.contains('active')) {
            if (e.key === 'Escape') closeFullscreen();
            else if (e.key === 'ArrowLeft') navigateFullscreen(-1);
            else if (e.key === 'ArrowRight') navigateFullscreen(1);
        }
    });
    fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) closeFullscreen();
    });
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
}

function handleFullscreenChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (fullscreenContainer) {
            fullscreenContainer.style.background = ''
        }
    }
}
init()