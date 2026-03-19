// Retro Photobooth - Multi-Step Workflow

// State variables
let stream = null;
let selectedLayout = 4;
let selectedFilter = 'retro';
let capturedPhotos = [];
let frameColor = '#1a1a1a';
let frameDesign = 'y2k-stars';
let stripLayout = 'filmstrip';
let polaroidFrameColor = 'white';
let polaroidCaption = '';
let polaroidStyle = 'classic';

// Some browsers show user-facing camera as mirrored by default.
// Keep this true to force a natural (non-mirrored) live preview.
const FRONT_CAMERA_PREVIEW_IS_MIRRORED = true;
const SESSION_STATE_KEY = 'photobooth-ui-state-v1';

const stripLayoutNames = {
    grid2x2: '2x2 Grid',
    polaroid: 'Polaroid Wall',
    compact: 'Compact',
    filmstrip: 'Filmstrip',
    postcard: 'Postcard Grid',
    triptych: 'Triptych',
    storyboard: 'Storyboard',
    contactsheet: 'Contact Sheet',
    gallerywall: 'Gallery Wall',
    neonmatrix: 'Neon Matrix',
    socialfeed: 'Social Feed',
    noirx: 'Noir X',
    doodle: 'Doodle Pop',
    music: 'Music Player',
    minimalwhite: 'Minimal White'
};

const FILTER_NAME_MAP = {
    retro: 'RETRO CLASSIC',
    sepia: 'SEPIA',
    bw: 'B&W',
    vaporwave: 'VAPORWAVE',
    neon: 'NEON',
    cool: 'COOL',
    crowns: 'CROWN OF HEARTS',
    'mirror-normal': 'NORMAL',
    'mirror-left': 'LEFT MIRROR',
    'mirror-right': 'RIGHT MIRROR',
    'mirror-top': 'TOP MIRROR',
    'mirror-bottom': 'BOTTOM MIRROR',
    'mirror-quad': 'QUAD MIRROR',
    'mirror-upsidedown': 'UPSIDE-DOWN',
    'mirror-switch': 'SWITCH',
    'mirror-kaleidoscope': 'KALEIDOSCOPE',
    'distort-spiral': 'SPIRAL',
    'distort-twist': 'TWIST',
    'distort-dent': 'DENT',
    'distort-pinch': 'PINCH',
    'distort-bulge': 'BULGE',
    'distort-fisheye': 'FISHEYE',
    'distort-wedge': 'WEDGE',
    'distort-ripple': 'RIPPLE',
    'distort-stretch': 'STRETCH',
    'distort-stretch-portrait': 'STRETCH PORTRAIT',
    'art-mono': 'MONO',
    'art-lomo': 'LOMO',
    'art-comicbook': 'COMIC BOOK',
    'art-monoquad': 'MONO QUAD',
    'art-lomoquad': 'LOMO QUAD',
    'art-comicstrip': 'COMIC STRIP',
    'art-magazine': 'MAGAZINE',
    'art-blackwhite': 'BLACK & WHITE',
    'art-cartoon': 'CARTOON',
    'tone-softfocus': 'SOFT FOCUS',
    'tone-hazydays': 'HAZY DAYS',
    'tone-vintage': 'VINTAGE',
    'tone-rose': 'ROSE',
    'tone-retro': 'RETRO',
    'tone-cocoa': 'COCOA',
    'tone-xpro': 'X-PRO',
    'tone-envy': 'ENVY',
    'tone-zinc': 'ZINC',
    'tone-thermal': 'THERMAL',
    'fx-fragment': 'FRAGMENT',
    'fx-quadcam': 'QUAD CAM',
    'fx-splitscreen': 'SPLIT SCREEN',
    'fx-filmstrip': 'FILMSTRIP',
    'fx-ghost': 'GHOST',
    'fx-colorghost': 'COLOR GHOST',
    'fx-trail': 'TRAIL',
    'fx-shuffle': 'SHUFFLE',
    'fx-tunnel': 'TUNNEL',
    'fx-spycam': 'SPY CAM'
};

const FRAME_DESIGN_MAP = {
    'y2k-stars': {
        borderColor: '#ff4fb3',
        glowColor: 'rgba(255, 79, 179, 0.38)',
        outerColor: 'rgba(28, 9, 22, 0.55)',
        symbol: '✦'
    },
    'cyber-hearts': {
        borderColor: '#ff2d7f',
        glowColor: 'rgba(255, 45, 127, 0.4)',
        outerColor: 'rgba(32, 8, 18, 0.55)',
        symbol: '♡'
    },
    'sparkle-cloud': {
        borderColor: '#7fe9ff',
        glowColor: 'rgba(127, 233, 255, 0.38)',
        outerColor: 'rgba(11, 24, 32, 0.55)',
        symbol: '☁'
    },
    'pixel-smile': {
        borderColor: '#ffd84d',
        glowColor: 'rgba(255, 216, 77, 0.4)',
        outerColor: 'rgba(38, 30, 9, 0.55)',
        symbol: '◕'
    },
    'glitch-butterfly': {
        borderColor: '#9a7cff',
        glowColor: 'rgba(154, 124, 255, 0.42)',
        outerColor: 'rgba(18, 14, 38, 0.56)',
        symbol: '🦋'
    }
};

function getStripTheme(layoutType) {
    const base = {
        bgTop: '#0a0a0a',
        bgBottom: '#1a1a1a',
        outerFrame: '#8bac0f',
        innerFrame: '#9bbc0f',
        headerFill: 'rgba(155, 188, 15, 0.3)',
        titleColor: '#ffd700',
        footerFill: 'rgba(155, 188, 15, 0.3)',
        footerText: '#9bbc0f',
        photoOuter: 'rgba(0, 0, 0, 0.4)',
        photoFrame: '#8bac0f'
    };

    const themes = {
        socialfeed: {
            bgTop: '#f5f5f5',
            bgBottom: '#ececec',
            outerFrame: '#ffffff',
            innerFrame: '#d0d0d0',
            headerFill: 'rgba(0, 0, 0, 0.06)',
            titleColor: '#222',
            footerFill: 'rgba(0, 0, 0, 0.05)',
            footerText: '#555',
            photoOuter: 'rgba(0, 0, 0, 0.2)',
            photoFrame: '#ffffff'
        },
        noirx: {
            bgTop: '#060606',
            bgBottom: '#141414',
            outerFrame: '#111111',
            innerFrame: '#c40024',
            headerFill: 'rgba(196, 0, 36, 0.22)',
            titleColor: '#ffffff',
            footerFill: 'rgba(196, 0, 36, 0.2)',
            footerText: '#ffffff',
            photoOuter: 'rgba(0, 0, 0, 0.7)',
            photoFrame: '#c40024'
        },
        doodle: {
            bgTop: '#fff9dc',
            bgBottom: '#fff4b5',
            outerFrame: '#ffe14f',
            innerFrame: '#ff8a00',
            headerFill: 'rgba(255, 122, 89, 0.22)',
            titleColor: '#2a2a2a',
            footerFill: 'rgba(255, 122, 89, 0.16)',
            footerText: '#2a2a2a',
            photoOuter: 'rgba(0, 0, 0, 0.24)',
            photoFrame: '#ff7a59'
        },
        music: {
            bgTop: '#050505',
            bgBottom: '#131313',
            outerFrame: '#121212',
            innerFrame: '#12d664',
            headerFill: 'rgba(18, 214, 100, 0.15)',
            titleColor: '#d9ffe9',
            footerFill: 'rgba(18, 214, 100, 0.2)',
            footerText: '#8af5bc',
            photoOuter: 'rgba(0, 0, 0, 0.6)',
            photoFrame: '#12d664'
        },
        minimalwhite: {
            bgTop: '#ffffff',
            bgBottom: '#f4f4f4',
            outerFrame: '#e7e7e7',
            innerFrame: '#bbbbbb',
            headerFill: 'rgba(0, 0, 0, 0.03)',
            titleColor: '#222222',
            footerFill: 'rgba(0, 0, 0, 0.04)',
            footerText: '#555555',
            photoOuter: 'rgba(0, 0, 0, 0.15)',
            photoFrame: '#d8d8d8'
        },
        contactsheet: {
            bgTop: '#0f1013',
            bgBottom: '#191b22',
            outerFrame: '#7ad8ff',
            innerFrame: '#35c2ff',
            headerFill: 'rgba(53, 194, 255, 0.2)',
            titleColor: '#d4f4ff',
            footerFill: 'rgba(53, 194, 255, 0.18)',
            footerText: '#a8eaff',
            photoOuter: 'rgba(0, 0, 0, 0.4)',
            photoFrame: '#35c2ff'
        },
        gallerywall: {
            bgTop: '#1a120f',
            bgBottom: '#241913',
            outerFrame: '#ffb85c',
            innerFrame: '#ff9a3c',
            headerFill: 'rgba(255, 154, 60, 0.22)',
            titleColor: '#ffe2b8',
            footerFill: 'rgba(255, 154, 60, 0.2)',
            footerText: '#ffcc8e',
            photoOuter: 'rgba(0, 0, 0, 0.45)',
            photoFrame: '#ff9a3c'
        },
        neonmatrix: {
            bgTop: '#050b08',
            bgBottom: '#0b1812',
            outerFrame: '#12d664',
            innerFrame: '#1bff78',
            headerFill: 'rgba(18, 214, 100, 0.18)',
            titleColor: '#c4ffdf',
            footerFill: 'rgba(18, 214, 100, 0.18)',
            footerText: '#8af5bc',
            photoOuter: 'rgba(0, 0, 0, 0.55)',
            photoFrame: '#12d664'
        }
    };

    return { ...base, ...(themes[layoutType] || {}) };
}

function drawThemeAccents(ctx, layoutType, width, height, frameWidth) {
    if (layoutType === 'noirx') {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 25, frameWidth + 22);
        ctx.lineTo(width / 2 + 25, frameWidth + 52);
        ctx.moveTo(width / 2 + 25, frameWidth + 22);
        ctx.lineTo(width / 2 - 25, frameWidth + 52);
        ctx.stroke();
    }

    if (layoutType === 'doodle') {
        const doodleColors = ['#ff7a59', '#6a5cff', '#00d4ff', '#fbbc05'];
        doodleColors.forEach((color, i) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(frameWidth + 12 + (i * 20), frameWidth + 12);
            ctx.lineTo(frameWidth + 25 + (i * 20), frameWidth + 40);
            ctx.stroke();
        });
    }

    if (layoutType === 'music') {
        const barY = height - frameWidth - 70;
        ctx.fillStyle = 'rgba(18, 214, 100, 0.15)';
        ctx.fillRect(frameWidth + 25, barY, width - (frameWidth * 2) - 50, 30);
        ctx.fillStyle = '#12d664';
        ctx.fillRect(frameWidth + 30, barY + 11, Math.max(60, Math.floor((width - 100) * 0.45)), 8);
        ctx.fillStyle = '#d9ffe9';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('NOW PLAYING', width / 2, barY - 6);
    }

    if (layoutType === 'socialfeed') {
        const topY = frameWidth + 14;
        ctx.fillStyle = '#8f8f8f';
        ctx.beginPath();
        ctx.arc(frameWidth + 30, topY + 18, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#666';
        ctx.fillRect(frameWidth + 46, topY + 14, 80, 8);
        ctx.fillRect(width - frameWidth - 48, topY + 14, 18, 8);
    }
}

// DOM elements
let video, canvas, ctx;
let livePreviewCanvas, livePreviewCtx;
let currentStep = 'layout';
let previewAnimationId = null;
let previousPreviewFrame = null;
let captureInProgress = false;

function saveSessionState() {
    try {
        const sessionState = {
            currentStep,
            selectedLayout,
            selectedFilter,
            stripLayout,
            frameColor,
            frameDesign
        };
        localStorage.setItem(SESSION_STATE_KEY, JSON.stringify(sessionState));
    } catch (error) {
        // Ignore storage errors to keep app functional.
    }
}

function loadSessionState() {
    try {
        const raw = localStorage.getItem(SESSION_STATE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
}

function applySessionState(sessionState) {
    if (!sessionState) {
        return;
    }

    const validSteps = ['layout', 'filters', 'capture', 'preview'];
    const validLayouts = [2, 3, 4, 5, 6, 8];

    if (validLayouts.includes(sessionState.selectedLayout)) {
        selectedLayout = sessionState.selectedLayout;
    }

    if (sessionState.selectedFilter && FILTER_NAME_MAP[sessionState.selectedFilter]) {
        selectedFilter = sessionState.selectedFilter;
    }

    if (sessionState.stripLayout && stripLayoutNames[sessionState.stripLayout]) {
        stripLayout = sessionState.stripLayout;
    }

    if (typeof sessionState.frameColor === 'string' && sessionState.frameColor.trim()) {
        frameColor = sessionState.frameColor;
    }

    if (sessionState.frameDesign && FRAME_DESIGN_MAP[sessionState.frameDesign]) {
        frameDesign = sessionState.frameDesign;
    }

    const selectedCard = document.querySelector(`.layout-option[data-layout="${selectedLayout}"]`);
    if (selectedCard) {
        document.querySelectorAll('.layout-option').forEach(opt => opt.classList.remove('selected'));
        selectedCard.classList.add('selected');
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === selectedFilter);
    });

    document.querySelectorAll('.capture-filter-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === selectedFilter);
    });

    document.querySelectorAll('.strip-layout-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-layout') === stripLayout);
    });

    document.querySelectorAll('.frame-design-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${frameDesign}'`));
    });

    const previewStrip = document.getElementById('previewStrip');
    if (previewStrip) {
        previewStrip.className = `preview-full-strip preview-${stripLayout}`;
    }

    const restoreStep = validSteps.includes(sessionState.currentStep) ? sessionState.currentStep : 'layout';
    showStep(restoreStep);
    updateCaptureUI();
    displayPreviewStrip();
    centerSelectedLayoutOption();
    centerActiveStripLayout();
}

// Initialize DOM elements after page loads
function initializeDOM() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    ctx = canvas && canvas.getContext('2d');
    livePreviewCanvas = document.getElementById('livePreviewCanvas');
    livePreviewCtx = livePreviewCanvas && livePreviewCanvas.getContext('2d');
}

// Show/hide steps
function showStep(stepName) {
    document.querySelectorAll('.photobooth-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step' + stepName.charAt(0).toUpperCase() + stepName.slice(1)).classList.add('active');
    currentStep = stepName;
    window.scrollTo(0, 0);
    
    // Update step indicator
    updateStepIndicator(stepName);
    saveSessionState();
}

// Update step indicator
function updateStepIndicator(stepName) {
    document.querySelectorAll('.step-indicator-item').forEach(item => {
        item.classList.remove('active', 'completed');
    });
    
    const stepMap = {
        'layout': 'stepIndicator1',
        'filters': 'stepIndicator2',
        'capture': 'stepIndicator3',
        'preview': 'stepIndicator4'
    };
    
    const currentStepIndex = Object.keys(stepMap).indexOf(stepName) + 1;
    
    // Mark completed steps
    for (let i = 1; i < currentStepIndex; i++) {
        const key = Object.keys(stepMap)[i - 1];
        document.getElementById(stepMap[key]).classList.add('completed');
    }
    
    // Mark current step
    document.getElementById(stepMap[stepName]).classList.add('active');
}

// STEP 1: Layout Selection
function selectLayout(count) {
    selectedLayout = count;
    document.querySelectorAll('.layout-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    const selectedCard = document.querySelector(`.layout-option[data-layout="${count}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    centerSelectedLayoutOption();
    saveSessionState();
    updateStatus(`Layout selected: ${count} photos`);
}

function scrollLayoutOptions(direction) {
    const viewport = document.getElementById('layoutViewport');
    if (!viewport) {
        return;
    }

    const scrollAmount = Math.max(240, Math.floor(viewport.clientWidth * 0.72));
    viewport.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function centerSelectedLayoutOption() {
    const viewport = document.getElementById('layoutViewport');
    const selected = document.querySelector('.layout-option.selected');
    if (!viewport || !selected) {
        return;
    }

    const target = selected.offsetLeft - (viewport.clientWidth / 2) + (selected.clientWidth / 2);
    viewport.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
}

function goToFilters() {
    showStep('filters');
}

// STEP 2: Filter Selection
function selectFilter(filterName) {
    selectedFilter = filterName;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filterName}"]`).classList.add('active');
    saveSessionState();
}

function goBackStep() {
    const backStepMap = {
        preview: 'capture',
        capture: 'filters',
        filters: 'layout',
        layout: 'layout'
    };
    showStep(backStepMap[currentStep] || 'layout');
}

function goToLayout() {
    showStep('layout');
}

function goToCapture() {
    capturedPhotos = [];
    showStep('capture');
    updateCaptureUI();
    
    // Apply current filter to video preview
    applyVideoPreviewFilter(selectedFilter);
    
    // Keep filter selector visible for live preview comparisons
    const filterSelector = document.getElementById('captureFilterSelector');
    if (filterSelector) {
        filterSelector.classList.remove('hidden');
    }

    previousPreviewFrame = null;
}

// STEP 3: Capture Photos
function startCamera() {
    const btn = document.getElementById('startCameraBtn');
    btn.disabled = true;
    btn.textContent = 'Camera Starting...';
    
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    }).then(mediaStream => {
        stream = mediaStream;
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (livePreviewCanvas && livePreviewCtx) {
                livePreviewCanvas.width = video.videoWidth;
                livePreviewCanvas.height = video.videoHeight;
            }
            
            // Apply current filter to video preview
            setTimeout(() => applyVideoPreviewFilter(selectedFilter), 100);
            startLivePreviewLoop();
            
            btn.style.display = 'none';
            document.getElementById('capturePhotoBtnMain').disabled = false;
            document.getElementById('retakeCaptureBtn').disabled = false;
            updateCaptureStatus('Camera ready! Click CAPTURE to start');
        };
    }).catch(error => {
        updateCaptureStatus('Error: ' + error.message);
        btn.disabled = false;
        btn.textContent = 'Start Camera';
    });
}

function capturePhoto() {
    if (captureInProgress) {
        return;
    }

    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
        updateCaptureStatus('Camera not ready');
        return;
    }

    const captureBtn = document.getElementById('capturePhotoBtnMain');
    captureInProgress = true;
    if (captureBtn) {
        captureBtn.disabled = true;
        captureBtn.textContent = 'CAPTURING...';
    }
    updateCaptureStatus('Capturing photo...');
    
    // Prefer the already-processed live preview frame for a snappier shutter response.
    if (livePreviewCanvas && livePreviewCanvas.width && livePreviewCanvas.height) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(livePreviewCanvas, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
    }
    
    // Convert to blob
    canvas.toBlob((blob) => {
        captureInProgress = false;
        if (captureBtn) {
            captureBtn.textContent = 'CAPTURE';
        }

        if (!blob) {
            if (captureBtn) {
                captureBtn.disabled = false;
            }
            updateCaptureStatus('Capture failed. Please try again.');
            return;
        }

        capturedPhotos.push(blob);
        updateCaptureUI();
        
        if (capturedPhotos.length < selectedLayout) {
            updateCaptureStatus(`✨ Photo ${capturedPhotos.length} captured! Click CAPTURE again`);
            if (captureBtn) {
                captureBtn.disabled = false;
            }
        } else {
            updateCaptureStatus(`🎉 All ${selectedLayout} photos captured! Click Next to preview`);
            if (captureBtn) {
                captureBtn.disabled = true;
            }
            document.getElementById('nextToPreviewBtn').disabled = false;
        }
    }, 'image/jpeg', 0.9);
}

function updateCaptureUI() {
    const count = capturedPhotos.length;
    document.getElementById('photoCounter').textContent = `Photo ${count + 1} of ${selectedLayout}`;
    document.getElementById('captureSubtitle').textContent = `Get ready to capture photo ${count + 1} of ${selectedLayout}`;
    document.getElementById('progressFill').style.width = (count / selectedLayout * 100) + '%';
    
    // Update filter display
    const displayName = FILTER_NAME_MAP[selectedFilter] || selectedFilter.toUpperCase();
    document.getElementById('captureFilterName').textContent = displayName;
}

function retakePhotos() {
    capturedPhotos = [];
    captureInProgress = false;
    updateCaptureUI();
    document.getElementById('capturePhotoBtnMain').disabled = false;
    document.getElementById('capturePhotoBtnMain').textContent = 'CAPTURE';
    document.getElementById('nextToPreviewBtn').disabled = true;
    updateCaptureStatus('Ready to capture again');
}

function goToPreview() {
    if (capturedPhotos.length < selectedLayout) {
        updateCaptureStatus('Not all photos captured yet');
        return;
    }
    
    // Reset video filter
    const video = document.getElementById('video');
    if (video) {
        video.style.filter = '';
    }
    
    // Stop camera stream
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    stopLivePreviewLoop();
    
    showStep('preview');
    displayPreviewStrip();
    centerActiveStripLayout();
}

// Filter selector for capture phase
function toggleCaptureFilterSelector() {
    const selector = document.getElementById('captureFilterSelector');
    if (selector) {
        selector.classList.remove('hidden');
    }
}

function changeCaptureFilter(filterName) {
    selectedFilter = filterName;
    previousPreviewFrame = null;
    
    // Update filter display name
    const displayName = FILTER_NAME_MAP[filterName] || filterName.toUpperCase();
    document.getElementById('captureFilterName').textContent = displayName;
    
    // Update active button in selector
    document.querySelectorAll('.capture-filter-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filterName) {
            btn.classList.add('active');
        }
    });
    
    updateCaptureStatus(`Filter changed to ${displayName}`);
    saveSessionState();
    
    // Apply CSS filter to video stream
    applyVideoPreviewFilter(filterName);
}

// Apply CSS filter to video element for real-time preview
function applyVideoPreviewFilter(filterName) {
    const video = document.getElementById('video');
    if (!video) return;

    // Live preview is rendered via canvas processing.
    video.style.filter = 'none';
    video.style.transform = 'none';
    video.style.clipPath = 'none';
}

function startLivePreviewLoop() {
    stopLivePreviewLoop();

    const render = () => {
        if (!video || !livePreviewCtx || !stream || video.readyState < 2) {
            previewAnimationId = requestAnimationFrame(render);
            return;
        }

        const width = livePreviewCanvas.width;
        const height = livePreviewCanvas.height;
        if (!width || !height) {
            previewAnimationId = requestAnimationFrame(render);
            return;
        }

        livePreviewCtx.clearRect(0, 0, width, height);
        livePreviewCtx.save();
        if (FRONT_CAMERA_PREVIEW_IS_MIRRORED) {
            livePreviewCtx.translate(width, 0);
            livePreviewCtx.scale(-1, 1);
        }
        livePreviewCtx.drawImage(video, 0, 0, width, height);
        livePreviewCtx.restore();

        applyFilter(livePreviewCtx, width, height, selectedFilter, true);
        previewAnimationId = requestAnimationFrame(render);
    };

    previewAnimationId = requestAnimationFrame(render);
}

function stopLivePreviewLoop() {
    if (previewAnimationId) {
        cancelAnimationFrame(previewAnimationId);
        previewAnimationId = null;
    }
}
function selectStripLayout(layoutType) {
    stripLayout = layoutType;
    document.querySelectorAll('.strip-layout-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-layout="${layoutType}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    const previewStrip = document.getElementById('previewStrip');
    previewStrip.className = `preview-full-strip preview-${layoutType}`;    
    // Show/hide polaroid customization
    const polaroidCustomize = document.getElementById('polaroidCustomize');
    if (layoutType === 'polaroid') {
        polaroidCustomize.style.display = 'block';
    } else {
        polaroidCustomize.style.display = 'none';
    }

    centerActiveStripLayout();
    displayPreviewStrip();
    saveSessionState();
    updateStatus(`Strip layout changed to ${stripLayoutNames[layoutType] || layoutType}`);
}

function scrollStripLayouts(direction) {
    const viewport = document.getElementById('stripLayoutViewport');
    if (!viewport) {
        return;
    }

    const scrollAmount = Math.max(220, Math.floor(viewport.clientWidth * 0.7));
    viewport.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

function centerActiveStripLayout() {
    const viewport = document.getElementById('stripLayoutViewport');
    const activeBtn = document.querySelector('.strip-layout-btn.active');
    if (!viewport || !activeBtn) {
        return;
    }

    const offset = activeBtn.offsetLeft - (viewport.clientWidth / 2) + (activeBtn.clientWidth / 2);
    viewport.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
}

function setPolaroidFrameColor(color) {
    polaroidFrameColor = color;
    document.querySelectorAll('.polaroid-color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    displayPreviewStrip();
}

function updatePolaroidCaption() {
    polaroidCaption = document.getElementById('polaroidCaption').value;
    displayPreviewStrip();
}

function setPolaroidStyle(style) {
    polaroidStyle = style;
    document.querySelectorAll('.polaroid-style-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    displayPreviewStrip();
}

function displayPreviewStrip() {
    const previewStrip = document.getElementById('previewStrip');
    previewStrip.innerHTML = '';
    
    // Apply layout class
    previewStrip.className = `preview-full-strip preview-${stripLayout}`;
    previewStrip.style.borderColor = frameColor;
    applyFrameDesignToPreview(previewStrip);
    
    if (stripLayout === 'polaroid') {
        // Polaroid wall with customization
        capturedPhotos.forEach((blob, index) => {
            const url = URL.createObjectURL(blob);
            
            // Create polaroid frame
            const polaroidFrame = document.createElement('div');
            polaroidFrame.className = 'polaroid-frame';
            polaroidFrame.style.backgroundColor = polaroidFrameColor;
            
            // Calculate rotation based on style
            let rotation = 0;
            if (polaroidStyle === 'classic') {
                rotation = (Math.random() - 0.5) * 6;
            } else if (polaroidStyle === 'scattered') {
                rotation = (Math.random() - 0.5) * 12;
            } else if (polaroidStyle === 'magazine') {
                rotation = 0;
            }
            
            polaroidFrame.style.transform = `rotate(${rotation}deg)`;
            
            // Photo container
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo polaroid-photo';
            photoDiv.style.backgroundColor = polaroidFrameColor;
            
            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            
            // Caption
            const caption = document.createElement('div');
            caption.className = 'polaroid-caption';
            caption.textContent = polaroidCaption || '✨';
            
            polaroidFrame.appendChild(photoDiv);
            polaroidFrame.appendChild(caption);
            previewStrip.appendChild(polaroidFrame);
        });
    } else if (stripLayout === 'grid2x2' || stripLayout === 'postcard' || stripLayout === 'storyboard' || stripLayout === 'gallerywall') {
        // 2x2 Grid - show only first 4 photos
        const photosToShow = capturedPhotos.slice(0, 4);
        photosToShow.forEach((blob) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);
            
            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    } else if (stripLayout === 'horizontal' || stripLayout === 'triptych') {
        // Horizontal - show all photos in a row
        const photosToShow = stripLayout === 'triptych' ? capturedPhotos.slice(0, 3) : capturedPhotos;
        photosToShow.forEach((blob) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);
            
            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    } else if (stripLayout === 'compact' || stripLayout === 'filmstrip' || stripLayout === 'contactsheet' || stripLayout === 'neonmatrix') {
        // Compact grid layout
        const photosToShow = (stripLayout === 'contactsheet' || stripLayout === 'neonmatrix')
            ? capturedPhotos.slice(0, 9)
            : capturedPhotos;
        photosToShow.forEach((blob) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);
            
            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    } else if (stripLayout === 'triptych') {
        capturedPhotos.slice(0, 3).forEach((blob) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);

            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    } else if (stripLayout === 'socialfeed' || stripLayout === 'noirx' || stripLayout === 'doodle' || stripLayout === 'music' || stripLayout === 'minimalwhite') {
        capturedPhotos.forEach((blob, index) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            if (stripLayout === 'socialfeed') {
                photoDiv.dataset.caption = index === capturedPhotos.length - 1 ? '@retro_memories' : '';
            }
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);

            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    } else {
        // Vertical - default, show all photos stacked
        capturedPhotos.forEach((blob) => {
            const url = URL.createObjectURL(blob);
            const photoDiv = document.createElement('div');
            photoDiv.className = 'preview-photo';
            photoDiv.style.backgroundColor = frameColor;
            photoDiv.setAttribute('data-frame-symbol', (FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars']).symbol);
            
            const img = document.createElement('img');
            img.src = url;
            photoDiv.appendChild(img);
            previewStrip.appendChild(photoDiv);
        });
    }
}

function setFrameColor(color) {
    frameColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
    displayPreviewStrip();
    saveSessionState();
}

function setFrameDesign(designType) {
    if (!FRAME_DESIGN_MAP[designType]) {
        return;
    }

    frameDesign = designType;
    document.querySelectorAll('.frame-design-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(`'${designType}'`)) {
            btn.classList.add('active');
        }
    });

    displayPreviewStrip();
    saveSessionState();
}

function applyFrameDesignToPreview(previewStrip) {
    const design = FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars'];
    previewStrip.style.setProperty('--frame-border-color', design.borderColor);
    previewStrip.style.setProperty('--frame-glow-color', design.glowColor);
}

async function downloadStrip() {
    if (capturedPhotos.length === 0) {
        updateStatus('No photos to download');
        return;
    }
    
    try {
        updateStatus('Creating professional strip...');
        
        const stripCanvas = document.createElement('canvas');
        const stripCtx = stripCanvas.getContext('2d');
        const photoSize = 450;
        const padding = 35;
        const frameWidth = 12;
        const gapSize = 10;
        const headerFooterHeight = 70;
        const borderInnerWidth = 6;
        
        let width, height;
        let photosToRender = capturedPhotos;
        let cols = 1;
        let rows = capturedPhotos.length;
        const theme = getStripTheme(stripLayout);
        const frameDesignConfig = FRAME_DESIGN_MAP[frameDesign] || FRAME_DESIGN_MAP['y2k-stars'];
        
        // Calculate dimensions based on layout
        switch(stripLayout) {
            case 'horizontal':
                cols = capturedPhotos.length;
                rows = 1;
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = photoSize + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'grid2x2':
                cols = 2;
                rows = 2;
                photosToRender = capturedPhotos.slice(0, 4);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'gallerywall':
                cols = 2;
                rows = Math.ceil(Math.min(capturedPhotos.length, 4) / 2);
                photosToRender = capturedPhotos.slice(0, 4);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'postcard':
            case 'storyboard':
                cols = 2;
                rows = Math.ceil(Math.min(capturedPhotos.length, 4) / 2);
                photosToRender = capturedPhotos.slice(0, 4);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'contactsheet':
            case 'neonmatrix':
                cols = 3;
                rows = Math.ceil(Math.min(capturedPhotos.length, 9) / 3);
                photosToRender = capturedPhotos.slice(0, 9);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'triptych':
                cols = Math.min(3, capturedPhotos.length);
                rows = 1;
                photosToRender = capturedPhotos.slice(0, 3);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = photoSize + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'filmstrip':
                cols = 1;
                rows = capturedPhotos.length;
                width = Math.floor(photoSize * 0.82) + (padding * 2) + (frameWidth * 2);
                height = (Math.floor(photoSize * 0.82) * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'compact':
                cols = Math.min(3, Math.ceil(Math.sqrt(capturedPhotos.length)));
                rows = Math.ceil(capturedPhotos.length / cols);
                width = (photoSize * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'socialfeed':
            case 'noirx':
            case 'doodle':
            case 'music':
            case 'minimalwhite':
                cols = 1;
                rows = capturedPhotos.length;
                width = Math.floor(photoSize * 0.86) + (padding * 2) + (frameWidth * 2);
                height = (Math.floor(photoSize * 0.86) * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            case 'polaroid':
                if (capturedPhotos.length <= 1) {
                    cols = 1;
                } else if (capturedPhotos.length <= 4) {
                    cols = 2;
                } else {
                    cols = 3;
                }
                rows = Math.ceil(capturedPhotos.length / cols);
                width = ((photoSize + 90) * cols) + (gapSize * (cols - 1)) + (padding * 2) + (frameWidth * 2);
                height = ((photoSize + 130) * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
                break;
            default: // vertical
                cols = 1;
                rows = capturedPhotos.length;
                width = photoSize + (padding * 2) + (frameWidth * 2);
                height = (photoSize * rows) + (gapSize * (rows - 1)) + (padding * 2) + (frameWidth * 2) + headerFooterHeight;
        }
        
        stripCanvas.width = width;
        stripCanvas.height = height;
        
        // Background gradient - darker to lighter
        const bgGradient = stripCtx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, theme.bgTop);
        bgGradient.addColorStop(1, theme.bgBottom);
        stripCtx.fillStyle = bgGradient;
        stripCtx.fillRect(0, 0, width, height);
        
        // Outer decorative frame (bright green - Game Boy style)
        stripCtx.fillStyle = theme.outerFrame;
        stripCtx.fillRect(0, 0, width, frameWidth);
        stripCtx.fillRect(0, height - frameWidth, width, frameWidth);
        stripCtx.fillRect(0, 0, frameWidth, height);
        stripCtx.fillRect(width - frameWidth, 0, frameWidth, height);
        
        // Inner border (lighter green accent)
        stripCtx.strokeStyle = theme.innerFrame;
        stripCtx.lineWidth = borderInnerWidth;
        stripCtx.strokeRect(frameWidth + 2, frameWidth + 2, width - (frameWidth * 2) - 4, height - (frameWidth * 2) - 4);
        
        // Header with branding
        const headerY = frameWidth + padding;
        stripCtx.fillStyle = theme.headerFill;
        stripCtx.fillRect(frameWidth + padding, frameWidth + padding, width - (frameWidth * 2) - (padding * 2), 50);
        
        // Branding text
        stripCtx.fillStyle = theme.titleColor;
        stripCtx.font = 'bold 24px Arial';
        stripCtx.textAlign = 'center';
        stripCtx.fillText('✨ RETRO PHOTOBOOTH ✨', width / 2, headerY + 35);

        drawThemeAccents(stripCtx, stripLayout, width, height, frameWidth);
        
        // Content area start
        let contentY = frameWidth + padding + headerFooterHeight;
        let contentX = frameWidth + padding;
        
        // Draw photos based on layout
        const imagePromises = [];
        for (let i = 0; i < photosToRender.length; i++) {
            imagePromises.push(new Promise((resolve) => {
                const url = URL.createObjectURL(photosToRender[i]);
                const img = new Image();
                img.onload = () => {
                    let x, y;
                    
                    if (stripLayout === 'polaroid') {
                        const polCols = cols;
                        const photoWithFrame = photoSize + 90;
                        const photoWithFrameH = photoSize + 130;
                        const col = i % polCols;
                        const row = Math.floor(i / polCols);
                        x = contentX + (col * (photoWithFrame + gapSize)) + 45;
                        y = contentY + (row * (photoWithFrameH + gapSize)) + 65;
                        
                        // Draw polaroid frame with style
                        stripCtx.fillStyle = polaroidFrameColor || '#ffffff';
                        stripCtx.fillRect(x - 45, y - 65, photoSize + 90, photoSize + 130);
                        
                        // Polaroid shadow
                        stripCtx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                        stripCtx.fillRect(x - 40, y + photoSize - 40, photoSize + 80, 10);
                        
                        // Draw photo
                        stripCtx.drawImage(img, x, y, photoSize, photoSize);
                        
                        // Polaroid caption area
                        stripCtx.fillStyle = '#999';
                        stripCtx.font = '12px Arial';
                        stripCtx.textAlign = 'center';
                        stripCtx.fillText(polaroidCaption || '✨', x + photoSize / 2, y + photoSize + 45);
                    } else {
                        // Grid-based layouts
                        const row = Math.floor(i / cols);
                        const col = i % cols;
                        
                        x = contentX + (col * (photoSize + gapSize));
                        y = contentY + (row * (photoSize + gapSize));
                        
                        // Draw photo with frame border
                        const renderSize = (stripLayout === 'filmstrip' || stripLayout === 'socialfeed' || stripLayout === 'noirx' || stripLayout === 'doodle' || stripLayout === 'music' || stripLayout === 'minimalwhite')
                            ? Math.floor(photoSize * 0.82)
                            : photoSize;

                        // Outer photo frame with shadow effect
                        stripCtx.fillStyle = frameDesignConfig.outerColor;
                        stripCtx.fillRect(x - 2, y - 2, renderSize + 4, renderSize + 4);
                        
                        // Photo border (bright green)
                        stripCtx.fillStyle = frameDesignConfig.borderColor;
                        stripCtx.fillRect(x - 4, y - 4, renderSize + 8, renderSize + 8);
                        
                        // Draw actual photo
                        stripCtx.drawImage(img, x, y, renderSize, renderSize);

                        stripCtx.fillStyle = frameDesignConfig.borderColor;
                        stripCtx.font = 'bold 16px Arial';
                        stripCtx.textAlign = 'right';
                        stripCtx.fillText(frameDesignConfig.symbol, x + renderSize - 10, y + 22);
                    }
                    
                    resolve();
                };
                img.src = url;
            }));
        }
        
        await Promise.all(imagePromises);
        
        // Footer with date
        const footerY = height - frameWidth - padding - 8;
        stripCtx.fillStyle = theme.footerFill;
        stripCtx.fillRect(frameWidth + padding, height - frameWidth - padding - 30 - 8, width - (frameWidth * 2) - (padding * 2), 40);
        
        stripCtx.fillStyle = theme.footerText;
        stripCtx.font = '13px Arial';
        stripCtx.textAlign = 'center';
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const selectedLayoutName = stripLayoutNames[stripLayout] || stripLayout;
        stripCtx.fillText(`${dateStr} • ${selectedLayoutName} • Memories Captured`, width / 2, footerY);
        
        // Download with higher quality
        stripCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `photobooth-${stripLayout}-${new Date().getTime()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Save to gallery
            saveStripToGallery(blob);
            updateStatus('✨ Professional strip downloaded! Saving to gallery...');
        }, 'image/jpeg', 0.98);
        
    } catch (error) {
        console.error('Error:', error);
        updateStatus('Error creating strip');
    }
}

async function saveStripToGallery(blob) {
    try {
        const formData = new FormData();
        formData.append('photo', blob, `photobooth-strip-${new Date().getTime()}.jpg`);
        
        const response = await fetch('api.php?action=save', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        if (data.success) {
            loadGallery();
            updateStatus('Strip saved to gallery!');
        }
    } catch (error) {
        console.error('Error saving strip:', error);
    }
}

function printStrip() {
    try {
        updateStatus('Preparing print...');
        
        const printWindow = window.open('', '_blank');
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Photo Strip Print</title>
                <style>
                    * { margin: 0; padding: 0; }
                    body { 
                        font-family: Arial, sans-serif; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh; 
                        background: #f0f0f0; 
                    }
                    .print-container { 
                        background: white; 
                        padding: 30px; 
                        border: 5px solid #000; 
                    }
                    .strip { 
                        width: 400px; 
                        border: 3px solid #ffd700; 
                        background: ` + frameColor + `; 
                    }
                    .photo { 
                        width: 100%; 
                        height: 400px; 
                        object-fit: cover; 
                        display: block; 
                        border-bottom: 2px solid #ff1493; 
                    }
                    .photo:last-child { border-bottom: none; }
                    .branding {
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                        margin-top: 20px;
                        color: #ffd700;
                    }
                    @media print { body { background: white; } }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="strip">
        `;
        
        capturedPhotos.forEach((blob) => {
            const url = URL.createObjectURL(blob);
            htmlContent += `<img src="${url}" class="photo" alt="photo">`;
        });
        
        htmlContent += `
                    </div>
                    <div class="branding">✨ RETRO PHOTOBOOTH ✨</div>
                </div>
            </body>
            </html>
        `;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
        }, 1500);
        
        updateStatus('Print dialog opened');
        
    } catch (error) {
        console.error('Error:', error);
        updateStatus('Error preparing print');
    }
}

function startOver() {
    // Stop camera
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    stopLivePreviewLoop();
    
    capturedPhotos = [];
    selectedLayout = 4;
    selectedFilter = 'retro';
    frameColor = '#1a1a1a';
    frameDesign = 'y2k-stars';
    stripLayout = 'filmstrip';
    localStorage.removeItem(SESSION_STATE_KEY);
    
    showStep('layout');
    updateStatus('Start a new session!');
}

// Gallery functions
async function loadGallery() {
    try {
        const response = await fetch('api.php?action=list');
        const data = await response.json();
        const gallery = document.getElementById('gallery');
        
        if (data.success && data.photos && data.photos.length > 0) {
            gallery.innerHTML = '';
            
            data.photos.forEach(photo => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = `uploads/${photo.filename}`;
                img.alt = photo.original_name || 'Gallery photo';
                
                const actions = document.createElement('div');
                actions.className = 'gallery-item-actions';
                
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'gallery-item-btn download';
                downloadBtn.textContent = '⬇️ Download';
                downloadBtn.onclick = (e) => {
                    e.stopPropagation();
                    downloadGalleryPhoto(photo.filename);
                };
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'gallery-item-btn delete';
                deleteBtn.textContent = '🗑️ Delete';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    deletePhoto(photo.filename);
                };
                
                actions.appendChild(downloadBtn);
                actions.appendChild(deleteBtn);
                item.appendChild(img);
                item.appendChild(actions);
                gallery.appendChild(item);
            });
        } else {
            gallery.innerHTML = '<p class="empty-message">No memories captured yet...</p>';
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

function downloadGalleryPhoto(filename) {
    const link = document.createElement('a');
    link.href = `uploads/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function deletePhoto(filename) {
    if (!confirm('Are you sure you want to delete this photo?')) {
        return;
    }
    
    try {
        await fetch(`api.php?action=delete&filename=${filename}`);
        loadGallery();
        updateStatus('Photo deleted');
    } catch (error) {
        console.error('Error deleting photo:', error);
    }
}

function updateStatus(message) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = 'status-message success';
    }
}

function updateCaptureStatus(message) {
    const el = document.getElementById('captureStatus');
    if (el) el.textContent = message;
}

/**
 * FILTER FUNCTIONS
 */

function applyFilter(ctx, width, height, filterType) {
    switch(filterType) {
        case 'retro':
            applyRetroFilter(ctx, width, height);
            break;
        case 'sepia':
            applySepiaFilter(ctx, width, height);
            break;
        case 'bw':
            applyBlackWhiteFilter(ctx, width, height);
            break;
        case 'vaporwave':
            applyVaporwaveFilter(ctx, width, height);
            break;
        case 'neon':
            applyNeonFilter(ctx, width, height);
            break;
        case 'cool':
            applyCoolFilter(ctx, width, height);
            break;
        case 'crowns':
            applyCrownsFilter(ctx, width, height);
            break;
        case 'mirror-normal':
            // No transformation needed
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-left':
            applyLeftMirror(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-right':
            applyRightMirror(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-top':
            applyTopMirror(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-bottom':
            applyBottomMirror(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-quad':
            applyQuadMirror(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-upsidedown':
            applyVerticalFlip(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-switch':
            applyRotate180(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'mirror-kaleidoscope':
            applyKaleidoscope(ctx, width, height);
            applyRetroFilter(ctx, width, height);
            break;
        case 'distort-spiral':
            applyDistortionFilter(ctx, width, height, 'spiral');
            break;
        case 'distort-twist':
            applyDistortionFilter(ctx, width, height, 'twist');
            break;
        case 'distort-dent':
            applyDistortionFilter(ctx, width, height, 'dent');
            break;
        case 'distort-pinch':
            applyDistortionFilter(ctx, width, height, 'pinch');
            break;
        case 'distort-bulge':
            applyDistortionFilter(ctx, width, height, 'bulge');
            break;
        case 'distort-fisheye':
            applyDistortionFilter(ctx, width, height, 'fisheye');
            break;
        case 'distort-wedge':
            applyDistortionFilter(ctx, width, height, 'wedge');
            break;
        case 'distort-ripple':
            applyDistortionFilter(ctx, width, height, 'ripple');
            break;
        case 'distort-stretch':
            applyDistortionFilter(ctx, width, height, 'stretch');
            break;
        case 'distort-stretch-portrait':
            applyDistortionFilter(ctx, width, height, 'stretch-portrait');
            break;
        case 'art-mono':
            applyMonoFilter(ctx, width, height);
            break;
        case 'art-lomo':
            applyLomoFilter(ctx, width, height);
            break;
        case 'art-comicbook':
            applyComicBookFilter(ctx, width, height);
            break;
        case 'art-monoquad':
            applyQuadCamFilter(ctx, width, height);
            applyMonoFilter(ctx, width, height);
            break;
        case 'art-lomoquad':
            applyQuadCamFilter(ctx, width, height);
            applyLomoFilter(ctx, width, height);
            break;
        case 'art-comicstrip':
            applyComicStripFilter(ctx, width, height);
            break;
        case 'art-magazine':
            applyMagazineFilter(ctx, width, height);
            break;
        case 'art-blackwhite':
            applyTrueBlackWhiteFilter(ctx, width, height);
            break;
        case 'art-cartoon':
            applyCartoonFilter(ctx, width, height);
            break;
        case 'tone-softfocus':
            applySoftFocusFilter(ctx, width, height);
            break;
        case 'tone-hazydays':
            applyHazyDaysFilter(ctx, width, height);
            break;
        case 'tone-vintage':
            applyVintageFilter(ctx, width, height);
            break;
        case 'tone-rose':
            applyRoseFilter(ctx, width, height);
            break;
        case 'tone-retro':
            applyRetroFilter(ctx, width, height);
            break;
        case 'tone-cocoa':
            applyCocoaFilter(ctx, width, height);
            break;
        case 'tone-xpro':
            applyXProFilter(ctx, width, height);
            break;
        case 'tone-envy':
            applyEnvyFilter(ctx, width, height);
            break;
        case 'tone-zinc':
            applyZincFilter(ctx, width, height);
            break;
        case 'tone-thermal':
            applyThermalFilter(ctx, width, height);
            break;
        case 'fx-fragment':
            applyFragmentFilter(ctx, width, height);
            break;
        case 'fx-quadcam':
            applyQuadCamFilter(ctx, width, height);
            break;
        case 'fx-splitscreen':
            applySplitScreenFilter(ctx, width, height);
            break;
        case 'fx-filmstrip':
            applyFilmstripFXFilter(ctx, width, height);
            break;
        case 'fx-ghost':
            applyGhostFilter(ctx, width, height);
            break;
        case 'fx-colorghost':
            applyColorGhostFilter(ctx, width, height);
            break;
        case 'fx-trail':
            applyTrailFilter(ctx, width, height);
            break;
        case 'fx-shuffle':
            applyShuffleFilter(ctx, width, height);
            break;
        case 'fx-tunnel':
            applyTunnelFilter(ctx, width, height);
            break;
        case 'fx-spycam':
            applySpyCamFilter(ctx, width, height);
            break;
        default:
            applyRetroFilter(ctx, width, height);
    }
}

// Mirror transform functions
function snapshotCanvas(ctx, width, height) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(ctx.canvas, 0, 0, width, height);
    return tempCanvas;
}

function applyHorizontalFlip(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(tempCanvas, 0, 0, width, height);
    ctx.restore();
}

function applyVerticalFlip(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.drawImage(tempCanvas, 0, 0, width, height);
    ctx.restore();
}

function applyLeftMirror(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    const halfW = Math.floor(width / 2);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, 0, 0, halfW, height, 0, 0, halfW, height);

    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(tempCanvas, 0, 0, halfW, height, 0, 0, halfW, height);
    ctx.restore();
}

function applyRightMirror(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    const halfW = Math.floor(width / 2);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, halfW, 0, width - halfW, height, halfW, 0, width - halfW, height);

    ctx.save();
    ctx.translate(halfW, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(tempCanvas, halfW, 0, width - halfW, height, 0, 0, width - halfW, height);
    ctx.restore();
}

function applyTopMirror(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    const halfH = Math.floor(height / 2);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, 0, 0, width, halfH, 0, 0, width, halfH);

    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.drawImage(tempCanvas, 0, 0, width, halfH, 0, 0, width, halfH);
    ctx.restore();
}

function applyBottomMirror(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    const halfH = Math.floor(height / 2);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, 0, halfH, width, height - halfH, 0, halfH, width, height - halfH);

    ctx.save();
    ctx.translate(0, halfH);
    ctx.scale(1, -1);
    ctx.drawImage(tempCanvas, 0, halfH, width, height - halfH, 0, 0, width, height - halfH);
    ctx.restore();
}

function applyRotate180(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(Math.PI);
    ctx.translate(-width / 2, -height / 2);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
}

function applyQuadMirror(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    const halfW = Math.floor(width / 2);
    const halfH = Math.floor(height / 2);

    ctx.clearRect(0, 0, width, height);

    // Top-left source quarter
    ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);

    // Top-right mirrored
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
    ctx.restore();

    // Bottom-left mirrored vertically
    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
    ctx.restore();

    // Bottom-right mirrored both axes
    ctx.save();
    ctx.translate(width, height);
    ctx.scale(-1, -1);
    ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
    ctx.restore();
}

function applyKaleidoscope(ctx, width, height) {
    const halfW = Math.floor(width / 2);
    const halfH = Math.floor(height / 2);
    const imageData = ctx.getImageData(0, 0, halfW, halfH);

    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);

    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(width, height);
    ctx.scale(-1, -1);
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
}

function applyFragmentFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    const shift = Math.max(18, Math.floor(width * 0.06));
    ctx.drawImage(temp, 0, 0);
    ctx.globalAlpha = 0.55;
    ctx.drawImage(temp, shift, 0, width - shift, height, 0, 0, width - shift, height);
    ctx.globalAlpha = 0.35;
    ctx.drawImage(temp, 0, 0, width - shift, height, shift, 0, width - shift, height);
    ctx.globalAlpha = 1;
}

function applyQuadCamFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    const halfW = Math.floor(width / 2);
    const halfH = Math.floor(height / 2);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(temp, 0, 0, width, height, 0, 0, halfW, halfH);
    ctx.drawImage(temp, 0, 0, width, height, halfW, 0, halfW, halfH);
    ctx.drawImage(temp, 0, 0, width, height, 0, halfH, halfW, halfH);
    ctx.drawImage(temp, 0, 0, width, height, halfW, halfH, halfW, halfH);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(halfW, 0); ctx.lineTo(halfW, height);
    ctx.moveTo(0, halfH); ctx.lineTo(width, halfH);
    ctx.stroke();
}

function applySplitScreenFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    const halfW = Math.floor(width / 2);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(temp, 0, 0, halfW, height, 0, 0, halfW, height);
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(temp, 0, 0, halfW, height, 0, 0, halfW, height);
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(halfW - 2, 0, 4, height);
}

function applyFilmstripFXFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    const cols = 4;
    const rows = 5;
    const pad = 6;
    const cellW = Math.floor((width - pad * (cols + 1)) / cols);
    const cellH = Math.floor((height - pad * (rows + 1)) / rows);

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = pad + c * (cellW + pad);
            const y = pad + r * (cellH + pad);
            ctx.drawImage(temp, 0, 0, width, height, x, y, cellW, cellH);
        }
    }
}

function applyGhostFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(temp, 0, 0);
    ctx.globalAlpha = 0.35;
    ctx.drawImage(temp, 14, 0, width - 14, height, 0, 0, width - 14, height);
    ctx.globalAlpha = 1;
}

function applyColorGhostFilter(ctx, width, height) {
    const src = ctx.getImageData(0, 0, width, height);
    const data = src.data;
    const out = ctx.createImageData(width, height);
    const dst = out.data;
    const shift = Math.max(6, Math.floor(width * 0.015));

    const idx = (x, y) => (y * width + x) * 4;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = idx(x, y);
            const xr = Math.max(0, Math.min(width - 1, x + shift));
            const xb = Math.max(0, Math.min(width - 1, x - shift));
            const ir = idx(xr, y);
            const ib = idx(xb, y);
            dst[i] = data[ir];
            dst[i + 1] = data[i + 1];
            dst[i + 2] = data[ib + 2];
            dst[i + 3] = 255;
        }
    }
    ctx.putImageData(out, 0, 0);
}

function applyTrailFilter(ctx, width, height) {
    const current = snapshotCanvas(ctx, width, height);
    if (previousPreviewFrame) {
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 0.45;
        ctx.drawImage(previousPreviewFrame, 10, 0, width - 10, height, 0, 0, width - 10, height);
        ctx.globalAlpha = 1;
        ctx.drawImage(current, 0, 0);
    }
    previousPreviewFrame = current;
}

function applyShuffleFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    const cols = 3;
    const rows = 3;
    const cellW = Math.floor(width / cols);
    const cellH = Math.floor(height / rows);
    const cells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            cells.push({ x: c * cellW, y: r * cellH });
        }
    }

    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    ctx.clearRect(0, 0, width, height);
    let k = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const sx = c * cellW;
            const sy = r * cellH;
            const d = cells[k++];
            ctx.drawImage(temp, sx, sy, cellW, cellH, d.x, d.y, cellW, cellH);
        }
    }
}

function applyTunnelFilter(ctx, width, height) {
    const temp = snapshotCanvas(ctx, width, height);
    const cx = width / 2;
    const cy = height / 2;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < 20; i++) {
        const t = i / 20;
        const scale = 1 - t * 0.75;
        const alpha = 0.08 + (1 - t) * 0.06;
        const w = width * scale;
        const h = height * scale;
        ctx.globalAlpha = alpha;
        ctx.drawImage(temp, cx - w / 2, cy - h / 2, w, h);
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(temp, 0, 0);
}

function applySpyCamFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
        const linePulse = 0.9 + 0.1 * Math.sin((Date.now() / 80) + (y * 0.12));
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
            const noise = (Math.random() - 0.5) * 24;

            // Green surveillance tint with scanline modulation.
            data[i] = Math.max(0, Math.min(255, gray * 0.22 + noise * 0.25));
            data[i + 1] = Math.max(0, Math.min(255, (gray * 1.1 + 16 + noise) * linePulse));
            data[i + 2] = Math.max(0, Math.min(255, gray * 0.15 + noise * 0.2));
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Horizontal scan lines.
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
    }

    // HUD corners.
    ctx.strokeStyle = 'rgba(98, 255, 118, 0.75)';
    ctx.lineWidth = 2;
    const s = Math.max(20, Math.floor(Math.min(width, height) * 0.08));
    ctx.beginPath();
    ctx.moveTo(10, s); ctx.lineTo(10, 10); ctx.lineTo(s, 10);
    ctx.moveTo(width - s - 10, 10); ctx.lineTo(width - 10, 10); ctx.lineTo(width - 10, s);
    ctx.moveTo(10, height - s - 10); ctx.lineTo(10, height - 10); ctx.lineTo(s, height - 10);
    ctx.moveTo(width - s - 10, height - 10); ctx.lineTo(width - 10, height - 10); ctx.lineTo(width - 10, height - s - 10);
    ctx.stroke();

    ctx.fillStyle = 'rgba(98, 255, 118, 0.9)';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('REC 00:13:27', 14, 26);
    ctx.fillText('CAM-04', width - 84, 26);
    ctx.restore();

    addVignette(ctx, width, height);
}

function applyDistortionFilter(ctx, width, height, mode) {
    const src = ctx.getImageData(0, 0, width, height);
    const srcData = src.data;
    const dst = ctx.createImageData(width, height);
    const dstData = dst.data;
    const cx = width / 2;
    const cy = height / 2;
    const sx = width / 2;
    const sy = height / 2;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const nx = (x - cx) / sx;
            const ny = (y - cy) / sy;
            const r = Math.sqrt(nx * nx + ny * ny);
            const a = Math.atan2(ny, nx);
            let ux = nx;
            let uy = ny;

            if (mode === 'spiral') {
                const t = a + 1.6 * (1 - Math.min(1, r));
                ux = Math.cos(t) * r;
                uy = Math.sin(t) * r;
            } else if (mode === 'twist') {
                const t = a + 0.85 * (1 - Math.min(1, r));
                ux = Math.cos(t) * r;
                uy = Math.sin(t) * r;
            } else if (mode === 'dent') {
                const rr = Math.pow(Math.min(1, r), 1.4);
                ux = Math.cos(a) * rr;
                uy = Math.sin(a) * rr;
            } else if (mode === 'pinch') {
                const rr = r * (1 - 0.38 * (1 - Math.min(1, r)));
                ux = Math.cos(a) * rr;
                uy = Math.sin(a) * rr;
            } else if (mode === 'bulge') {
                const rr = Math.pow(Math.min(1, r), 0.72);
                ux = Math.cos(a) * rr;
                uy = Math.sin(a) * rr;
            } else if (mode === 'fisheye') {
                const rr = Math.min(1, Math.tan(Math.min(1, r) * 0.88) / Math.tan(0.88));
                ux = Math.cos(a) * rr;
                uy = Math.sin(a) * rr;
            } else if (mode === 'wedge') {
                ux = nx + 0.42 * ny * (1 - Math.abs(nx));
                uy = ny;
            } else if (mode === 'ripple') {
                ux = nx + 0.06 * Math.sin(12 * ny);
                uy = ny + 0.06 * Math.sin(12 * nx);
            } else if (mode === 'stretch') {
                ux = nx / 1.35;
                uy = ny;
            } else if (mode === 'stretch-portrait') {
                ux = nx;
                uy = ny / 1.35;
            }

            const px = clamp(Math.round(cx + ux * sx), 0, width - 1);
            const py = clamp(Math.round(cy + uy * sy), 0, height - 1);

            const di = (y * width + x) * 4;
            const si = (py * width + px) * 4;
            dstData[di] = srcData[si];
            dstData[di + 1] = srcData[si + 1];
            dstData[di + 2] = srcData[si + 2];
            dstData[di + 3] = srcData[si + 3];
        }
    }

    ctx.putImageData(dst, 0, 0);
}

function applyMonoFilter(ctx, width, height) {
    applyBlackWhiteFilter(ctx, width, height);
}

function applyLomoFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.18 + 10);
        data[i + 1] = Math.min(255, data[i + 1] * 1.04);
        data[i + 2] = Math.max(0, data[i + 2] * 0.9);
    }
    ctx.putImageData(imageData, 0, 0);
    addVignette(ctx, width, height);
}

function applyComicBookFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const levels = 4;

    const dot = (x, y, period, offsetX, offsetY, radius) => {
        const dx = ((x + offsetX) % period) - period / 2;
        const dy = ((y + offsetY) % period) - period / 2;
        return (dx * dx + dy * dy) <= (radius * radius) ? 1 : 0;
    };

    for (let i = 0; i < data.length; i += 4) {
        const q = 255 / levels;
        data[i] = Math.round(data[i] / q) * q;
        data[i + 1] = Math.round(data[i + 1] / q) * q;
        data[i + 2] = Math.round(data[i + 2] / q) * q;
    }

    const period = 6;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const ink = 1 - lum;
            const radius = Math.max(0.8, ink * 2.6);

            const cDot = dot(x, y, period, 0, 0, radius);
            const mDot = dot(x, y, period, 2, 1, radius);
            const yDot = dot(x, y, period, 1, 3, radius);

            // CMY-style halftone attenuation to get comic print texture.
            let nr = r * (1 - 0.3 * cDot) + 16 * mDot;
            let ng = g * (1 - 0.3 * mDot) + 12 * yDot;
            let nb = b * (1 - 0.3 * yDot) + 18 * cDot;

            // Extra black ink in dark areas for comic contrast.
            if (ink > 0.62 && ((x + y) % 4 === 0)) {
                nr *= 0.78;
                ng *= 0.78;
                nb *= 0.78;
            }

            data[i] = Math.max(0, Math.min(255, nr * 1.06));
            data[i + 1] = Math.max(0, Math.min(255, ng * 1.06));
            data[i + 2] = Math.max(0, Math.min(255, nb * 1.06));
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function applyComicStripFilter(ctx, width, height) {
    // 2x2 strip with green-toned halftone comic treatment.
    applyQuadCamFilter(ctx, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const period = 5;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            lum = Math.max(0, Math.min(1, (lum - 0.5) * 1.25 + 0.5));

            const dx = (x % period) - period / 2;
            const dy = (y % period) - period / 2;
            const dotRadius = Math.max(0.85, (1 - lum) * 2.2);
            const isDot = (dx * dx + dy * dy) <= (dotRadius * dotRadius);

            const base = Math.round(lum * 255);
            const ink = isDot ? 0.74 : 1;

            // Green comic tint similar to earlier look.
            data[i] = Math.max(0, Math.min(255, base * 0.55 * ink));
            data[i + 1] = Math.max(0, Math.min(255, (base * 1.15 + 18) * ink));
            data[i + 2] = Math.max(0, Math.min(255, base * 0.62 * ink));
        }
    }

    ctx.putImageData(imageData, 0, 0);

    const halfW = Math.floor(width / 2);
    const halfH = Math.floor(height / 2);
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(halfW, 0);
    ctx.lineTo(halfW, height);
    ctx.moveTo(0, halfH);
    ctx.lineTo(width, halfH);
    ctx.stroke();
    ctx.restore();
}

function applyMagazineFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const hi = gray > 150 ? 245 : gray < 75 ? 30 : 145;
        data[i] = hi;
        data[i + 1] = hi;
        data[i + 2] = hi;
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyTrueBlackWhiteFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const bw = gray > 128 ? 255 : 0;
        data[i] = bw;
        data[i + 1] = bw;
        data[i + 2] = bw;
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyCartoonFilter(ctx, width, height) {
    applyComicBookFilter(ctx, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (lum < 55) {
            data[i] = 25;
            data[i + 1] = 25;
            data[i + 2] = 25;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function applySoftFocusFilter(ctx, width, height) {
    const tempCanvas = snapshotCanvas(ctx, width, height);
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.filter = 'blur(8px)';
    ctx.drawImage(tempCanvas, 0, 0, width, height);
    ctx.restore();
}

function applyHazyDaysFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.08 + 14);
        data[i + 1] = Math.min(255, data[i + 1] * 1.05 + 10);
        data[i + 2] = Math.min(255, data[i + 2] * 0.98 + 6);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyVintageFilter(ctx, width, height) {
    applySepiaFilter(ctx, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.05);
        data[i + 1] = Math.min(255, data[i + 1] * 0.95);
        data[i + 2] = Math.min(255, data[i + 2] * 0.82);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyRoseFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.2 + 8);
        data[i + 1] = Math.min(255, data[i + 1] * 0.92);
        data[i + 2] = Math.min(255, data[i + 2] * 1.03 + 4);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyCocoaFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.06);
        data[i + 1] = Math.min(255, data[i + 1] * 0.9);
        data[i + 2] = Math.min(255, data[i + 2] * 0.72);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyXProFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.18);
        data[i + 1] = Math.min(255, data[i + 1] * 1.03);
        data[i + 2] = Math.min(255, data[i + 2] * 0.95 + 8);
    }
    ctx.putImageData(imageData, 0, 0);
    addVignette(ctx, width, height);
}

function applyEnvyFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 0.85);
        data[i + 1] = Math.min(255, data[i + 1] * 1.2 + 8);
        data[i + 2] = Math.min(255, data[i + 2] * 0.9);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyZincFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = Math.min(255, gray * 0.95);
        data[i + 1] = Math.min(255, gray * 1.02);
        data[i + 2] = Math.min(255, gray * 1.12);
    }
    ctx.putImageData(imageData, 0, 0);
}

function applyThermalFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const thermalRamp = (v) => {
        // v: normalized luminance 0..1, remapped to thermal palette.
        if (v < 0.2) {
            const t = v / 0.2;
            return [0, 0, Math.floor(128 + t * 127)];
        }
        if (v < 0.4) {
            const t = (v - 0.2) / 0.2;
            return [0, Math.floor(t * 255), 255];
        }
        if (v < 0.6) {
            const t = (v - 0.4) / 0.2;
            return [Math.floor(t * 255), 255, Math.floor(255 - t * 255)];
        }
        if (v < 0.8) {
            const t = (v - 0.6) / 0.2;
            return [255, Math.floor(255 - t * 120), 0];
        }
        const t = (v - 0.8) / 0.2;
        return [255, Math.floor(135 + t * 120), Math.floor(t * 90)];
    };

    for (let i = 0; i < data.length; i += 4) {
        const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        const contrastLum = Math.max(0, Math.min(1, (lum - 0.5) * 1.2 + 0.55));
        const [r, g, b] = thermalRamp(contrastLum);
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
    }

    ctx.putImageData(imageData, 0, 0);
}

function applyRetroFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const saturation = 1.3;
        
        data[i] = Math.min(255, r + (r - lum) * saturation);
        data[i + 1] = Math.min(255, g + (g - lum) * saturation);
        data[i + 2] = Math.min(255, b + (b - lum) * saturation);
        
        data[i] = Math.min(255, data[i] * 1.1);
        data[i + 1] = Math.min(255, data[i + 1] * 1.05);
        data[i + 2] = Math.max(0, data[i + 2] * 0.85);
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
    addLightLeak(ctx, width, height);
    addVignette(ctx, width, height);
}

function applySepiaFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
    addVignette(ctx, width, height);
}

function applyBlackWhiteFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
    addVignette(ctx, width, height);
}

function applyVaporwaveFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        
        data[i] = lum * 0.7 + r * 0.3;
        data[i + 1] = lum * 0.5 + g * 0.5;
        data[i + 2] = lum * 0.3 + b * 0.7;
        
        const shift = Math.sin(i / 100) * 20;
        data[i] = Math.min(255, data[i] + shift * 1.5);
        data[i + 2] = Math.min(255, data[i + 2] + shift);
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
}

function applyNeonFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const saturation = 2.5;
        
        data[i] = Math.min(255, r + (r - lum) * saturation);
        data[i + 1] = Math.min(255, g + (g - lum) * saturation);
        data[i + 2] = Math.min(255, b + (b - lum) * saturation);
    }
    
    ctx.putImageData(imageData, 0, 0);
    addVignette(ctx, width, height);
}

function applyCoolFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        data[i] = Math.max(0, r * 0.85);
        data[i + 1] = Math.min(255, g * 1.05);
        data[i + 2] = Math.min(255, b * 1.25);
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
    addVignette(ctx, width, height);
}

function applyCrownsFilter(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Crown of Hearts: Enhanced pinks/magentas with heart-like color scheme
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Boost reds and purples
        data[i] = Math.min(255, r * 1.25);
        data[i + 1] = Math.min(255, g * 0.8);
        data[i + 2] = Math.min(255, b * 1.15);
        
        // Increase saturation
        const max = Math.max(data[i], data[i + 1], data[i + 2]);
        const min = Math.min(data[i], data[i + 1], data[i + 2]);
        if (max > 0) {
            const l = (max + min) / 2;
            const s = (max - min) / (max + min <= 127.5 ? max + min : 510 - max - min);
            data[i] = Math.min(255, Math.max(0, data[i] + (data[i] - l) * 0.3));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + (data[i + 1] - l) * 0.3));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (data[i + 2] - l) * 0.3));
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    addFilmGrain(ctx, width, height);
    addVignette(ctx, width, height);
}

function addFilmGrain(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const grainIntensity = 25;
    
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * grainIntensity;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function addLightLeak(ctx, width, height) {
    const leakTypes = [
        { color: 'rgba(255, 100, 50, 0.15)', x: 0, y: 0 },
        { color: 'rgba(255, 200, 0, 0.12)', x: width, y: 0 },
        { color: 'rgba(255, 50, 150, 0.1)', x: 0, y: height },
        { color: 'rgba(0, 255, 150, 0.1)', x: width, y: height },
    ];
    
    const leak = leakTypes[Math.floor(Math.random() * leakTypes.length)];
    const leakGradient = ctx.createRadialGradient(leak.x, leak.y, 0, leak.x, leak.y, Math.max(width, height) * 0.8);
    leakGradient.addColorStop(0, leak.color);
    leakGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = leakGradient;
    ctx.fillRect(0, 0, width, height);
}

function addVignette(ctx, width, height) {
    const vignetteGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.sqrt(width * width + height * height) / 2);
    vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignetteGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
    vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, width, height);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    loadGallery();

    const sessionState = loadSessionState();
    if (sessionState) {
        applySessionState(sessionState);
        updateStatus('Session restored. Use Back if you want to return to previous steps.');
    } else {
        updateStatus('Welcome to Retro Photobooth! Select your layout to begin');
        centerSelectedLayoutOption();
        centerActiveStripLayout();
    }
});
