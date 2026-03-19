<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retro Photobooth 📸 - 70s-90s Vibes</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css?v=20260319u">
    <link rel="stylesheet" href="css/animations.css?v=20260319u">
    <link rel="stylesheet" href="css/theme-crown-of-hearts.css?v=20260319u">
</head>
<body>
    <div class="container">
        <div class="photobooth">
            <h1>RETRO PHOTOBOOTH</h1>
            <p class="brand-subtitle">70s • 80s • 90s VIBES</p>
            
            <!-- Step Indicator -->
            <div class="step-indicator">
                <div class="step-indicator-item active" id="stepIndicator1">
                    <div class="step-indicator-circle">1</div>
                    <div class="step-indicator-label">Layout</div>
                </div>
                <div class="step-indicator-connector"></div>
                <div class="step-indicator-item" id="stepIndicator2">
                    <div class="step-indicator-circle">2</div>
                    <div class="step-indicator-label">Filters</div>
                </div>
                <div class="step-indicator-connector"></div>
                <div class="step-indicator-item" id="stepIndicator3">
                    <div class="step-indicator-circle">3</div>
                    <div class="step-indicator-label">Capture</div>
                </div>
                <div class="step-indicator-connector"></div>
                <div class="step-indicator-item" id="stepIndicator4">
                    <div class="step-indicator-circle">4</div>
                    <div class="step-indicator-label">Preview</div>
                </div>
            </div>
            
            <!-- STEP 1: Choose Layout -->
            <div id="stepLayout" class="photobooth-step active">
                <h2>🎬 Choose Your Layout</h2>
                <p class="step-subtitle">Select how many photos you want to capture</p>
                
                <div class="layout-slider">
                    <button type="button" class="layout-slider-nav" onclick="scrollLayoutOptions(-1)" aria-label="Previous layouts">◀</button>
                    <div id="layoutViewport" class="layout-viewport">
                        <div class="layout-selector">
                            <div class="layout-option" data-layout="2" onclick="selectLayout(2)">
                        <div class="layout-preview layout-2">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">2 Photos</p>
                        <p class="layout-option-subtitle">Quick Snap</p>
                    </div>
                    
                            <div class="layout-option" data-layout="3" onclick="selectLayout(3)">
                        <div class="layout-preview layout-3">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">3 Photos</p>
                        <p class="layout-option-subtitle">Trio</p>
                    </div>
                    
                            <div class="layout-option selected" data-layout="4" onclick="selectLayout(4)">
                        <div class="layout-preview layout-4">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">4 Photos</p>
                        <p class="layout-option-subtitle">Classic Strip</p>
                    </div>
                    
                            <div class="layout-option" data-layout="6" onclick="selectLayout(6)">
                        <div class="layout-preview layout-6">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">6 Photos</p>
                        <p class="layout-option-subtitle">Full Strip</p>
                    </div>

                            <div class="layout-option" data-layout="5" onclick="selectLayout(5)">
                        <div class="layout-preview layout-5">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">5 Photos</p>
                        <p class="layout-option-subtitle">Story Strip</p>
                    </div>

                            <div class="layout-option" data-layout="8" onclick="selectLayout(8)">
                        <div class="layout-preview layout-8">
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                            <div class="layout-preview-box">📷</div>
                        </div>
                        <p class="layout-option-count">8 Photos</p>
                        <p class="layout-option-subtitle">Mega Strip</p>
                    </div>
                        </div>
                    </div>
                    <button type="button" class="layout-slider-nav" onclick="scrollLayoutOptions(1)" aria-label="Next layouts">▶</button>
                </div>
                
                <div class="step-buttons">
                    <button id="nextToFiltersBtn" class="btn btn-primary btn-lg" onclick="goToFilters()">Next → Choose Filters</button>
                </div>
            </div>
            
            <!-- STEP 2: Choose Filters -->
            <div id="stepFilters" class="photobooth-step">
                <h2>🎨 Choose Your Filters</h2>
                <p class="step-subtitle">Select a filter for your photos</p>
                
                <div class="filter-groups">
                    <div class="filter-group-block">
                        <p class="filter-group-title">Classic Looks</p>
                        <div class="filter-buttons">
                            <button class="filter-btn active" data-filter="retro" onclick="selectFilter('retro')">
                                <span class="filter-icon">✨</span> Retro Classic
                            </button>
                            <button class="filter-btn" data-filter="sepia" onclick="selectFilter('sepia')">
                                <span class="filter-icon">🟤</span> Sepia
                            </button>
                            <button class="filter-btn" data-filter="bw" onclick="selectFilter('bw')">
                                <span class="filter-icon">⚫</span> B&W
                            </button>
                            <button class="filter-btn" data-filter="vaporwave" onclick="selectFilter('vaporwave')">
                                <span class="filter-icon">💜</span> Vaporwave
                            </button>
                            <button class="filter-btn" data-filter="neon" onclick="selectFilter('neon')">
                                <span class="filter-icon">🌈</span> Neon
                            </button>
                            <button class="filter-btn" data-filter="cool" onclick="selectFilter('cool')">
                                <span class="filter-icon">❄️</span> Cool
                            </button>
                            <button class="filter-btn" data-filter="crowns" onclick="selectFilter('crowns')">
                                <span class="filter-icon">👑</span> Crown of Hearts
                            </button>
                        </div>
                    </div>

                    <div class="filter-group-block">
                        <p class="filter-group-title">Mirror And Transform</p>
                        <div class="filter-buttons filter-buttons-mirror">
                            <button class="filter-btn" data-filter="mirror-normal" onclick="selectFilter('mirror-normal')">
                                <span class="filter-icon">📸</span> Normal
                            </button>
                            <button class="filter-btn" data-filter="mirror-left" onclick="selectFilter('mirror-left')">
                                <span class="filter-icon">↔️</span> Left Mirror
                            </button>
                            <button class="filter-btn" data-filter="mirror-right" onclick="selectFilter('mirror-right')">
                                <span class="filter-icon">↔️</span> Right Mirror
                            </button>
                            <button class="filter-btn" data-filter="mirror-top" onclick="selectFilter('mirror-top')">
                                <span class="filter-icon">↕️</span> Top Mirror
                            </button>
                            <button class="filter-btn" data-filter="mirror-bottom" onclick="selectFilter('mirror-bottom')">
                                <span class="filter-icon">↕️</span> Bottom Mirror
                            </button>
                            <button class="filter-btn" data-filter="mirror-quad" onclick="selectFilter('mirror-quad')">
                                <span class="filter-icon">📊</span> Quad Mirror
                            </button>
                            <button class="filter-btn" data-filter="mirror-upsidedown" onclick="selectFilter('mirror-upsidedown')">
                                <span class="filter-icon">🔄</span> Upside-Down
                            </button>
                            <button class="filter-btn" data-filter="mirror-switch" onclick="selectFilter('mirror-switch')">
                                <span class="filter-icon">🔀</span> Switch
                            </button>
                            <button class="filter-btn" data-filter="mirror-kaleidoscope" onclick="selectFilter('mirror-kaleidoscope')">
                                <span class="filter-icon">🎨</span> Kaleidoscope
                            </button>
                        </div>
                    </div>

                    <div class="filter-group-block">
                        <p class="filter-group-title">Distortion Effects</p>
                        <div class="filter-buttons filter-buttons-mirror">
                            <button class="filter-btn" data-filter="distort-spiral" onclick="selectFilter('distort-spiral')"><span class="filter-icon">🌀</span> Spiral</button>
                            <button class="filter-btn" data-filter="distort-twist" onclick="selectFilter('distort-twist')"><span class="filter-icon">🌪️</span> Twist</button>
                            <button class="filter-btn" data-filter="distort-dent" onclick="selectFilter('distort-dent')"><span class="filter-icon">🕳️</span> Dent</button>
                            <button class="filter-btn" data-filter="distort-pinch" onclick="selectFilter('distort-pinch')"><span class="filter-icon">🤏</span> Pinch</button>
                            <button class="filter-btn" data-filter="distort-bulge" onclick="selectFilter('distort-bulge')"><span class="filter-icon">🔮</span> Bulge</button>
                            <button class="filter-btn" data-filter="distort-fisheye" onclick="selectFilter('distort-fisheye')"><span class="filter-icon">🐟</span> Fisheye</button>
                            <button class="filter-btn" data-filter="distort-wedge" onclick="selectFilter('distort-wedge')"><span class="filter-icon">📐</span> Wedge</button>
                            <button class="filter-btn" data-filter="distort-ripple" onclick="selectFilter('distort-ripple')"><span class="filter-icon">🌊</span> Ripple</button>
                            <button class="filter-btn" data-filter="distort-stretch" onclick="selectFilter('distort-stretch')"><span class="filter-icon">↔️</span> Stretch</button>
                            <button class="filter-btn" data-filter="distort-stretch-portrait" onclick="selectFilter('distort-stretch-portrait')"><span class="filter-icon">↕️</span> Stretch Portrait</button>
                        </div>
                    </div>

                    <div class="filter-group-block">
                        <p class="filter-group-title">Artistic Styles</p>
                        <div class="filter-buttons filter-buttons-mirror">
                            <button class="filter-btn" data-filter="art-mono" onclick="selectFilter('art-mono')"><span class="filter-icon">⚪</span> Mono</button>
                            <button class="filter-btn" data-filter="art-lomo" onclick="selectFilter('art-lomo')"><span class="filter-icon">🌇</span> Lomo</button>
                            <button class="filter-btn" data-filter="art-comicbook" onclick="selectFilter('art-comicbook')"><span class="filter-icon">📚</span> Comic Book</button>
                            <button class="filter-btn" data-filter="art-monoquad" onclick="selectFilter('art-monoquad')"><span class="filter-icon">◻️</span> Mono Quad</button>
                            <button class="filter-btn" data-filter="art-lomoquad" onclick="selectFilter('art-lomoquad')"><span class="filter-icon">🟧</span> Lomo Quad</button>
                            <button class="filter-btn" data-filter="art-comicstrip" onclick="selectFilter('art-comicstrip')"><span class="filter-icon">🗞️</span> Comic Strip</button>
                            <button class="filter-btn" data-filter="art-magazine" onclick="selectFilter('art-magazine')"><span class="filter-icon">📰</span> Magazine</button>
                            <button class="filter-btn" data-filter="art-blackwhite" onclick="selectFilter('art-blackwhite')"><span class="filter-icon">⚫</span> Black &amp; White</button>
                            <button class="filter-btn" data-filter="art-cartoon" onclick="selectFilter('art-cartoon')"><span class="filter-icon">🎭</span> Cartoon</button>
                        </div>
                    </div>

                    <div class="filter-group-block">
                        <p class="filter-group-title">Color Mood</p>
                        <div class="filter-buttons filter-buttons-mirror">
                            <button class="filter-btn" data-filter="tone-softfocus" onclick="selectFilter('tone-softfocus')"><span class="filter-icon">☁️</span> Soft Focus</button>
                            <button class="filter-btn" data-filter="tone-hazydays" onclick="selectFilter('tone-hazydays')"><span class="filter-icon">🌤️</span> Hazy Days</button>
                            <button class="filter-btn" data-filter="tone-vintage" onclick="selectFilter('tone-vintage')"><span class="filter-icon">📷</span> Vintage</button>
                            <button class="filter-btn" data-filter="tone-rose" onclick="selectFilter('tone-rose')"><span class="filter-icon">🌹</span> Rose</button>
                            <button class="filter-btn" data-filter="tone-retro" onclick="selectFilter('tone-retro')"><span class="filter-icon">🕹️</span> Retro</button>
                            <button class="filter-btn" data-filter="tone-cocoa" onclick="selectFilter('tone-cocoa')"><span class="filter-icon">🍫</span> Cocoa</button>
                            <button class="filter-btn" data-filter="tone-xpro" onclick="selectFilter('tone-xpro')"><span class="filter-icon">🎞️</span> X-Pro</button>
                            <button class="filter-btn" data-filter="tone-envy" onclick="selectFilter('tone-envy')"><span class="filter-icon">💚</span> Envy</button>
                            <button class="filter-btn" data-filter="tone-zinc" onclick="selectFilter('tone-zinc')"><span class="filter-icon">🩶</span> Zinc</button>
                            <button class="filter-btn" data-filter="tone-thermal" onclick="selectFilter('tone-thermal')"><span class="filter-icon">🌡️</span> Thermal</button>
                        </div>
                    </div>

                    <div class="filter-group-block">
                        <p class="filter-group-title">Creative FX</p>
                        <div class="filter-buttons filter-buttons-mirror">
                            <button class="filter-btn" data-filter="fx-fragment" onclick="selectFilter('fx-fragment')"><span class="filter-icon">🧩</span> Fragment</button>
                            <button class="filter-btn" data-filter="fx-quadcam" onclick="selectFilter('fx-quadcam')"><span class="filter-icon">🎞️</span> Quad Cam</button>
                            <button class="filter-btn" data-filter="fx-splitscreen" onclick="selectFilter('fx-splitscreen')"><span class="filter-icon">🪟</span> Split Screen</button>
                            <button class="filter-btn" data-filter="fx-filmstrip" onclick="selectFilter('fx-filmstrip')"><span class="filter-icon">🎬</span> Filmstrip</button>
                            <button class="filter-btn" data-filter="fx-ghost" onclick="selectFilter('fx-ghost')"><span class="filter-icon">👻</span> Ghost</button>
                            <button class="filter-btn" data-filter="fx-colorghost" onclick="selectFilter('fx-colorghost')"><span class="filter-icon">🌈</span> Color Ghost</button>
                            <button class="filter-btn" data-filter="fx-trail" onclick="selectFilter('fx-trail')"><span class="filter-icon">✨</span> Trail</button>
                            <button class="filter-btn" data-filter="fx-shuffle" onclick="selectFilter('fx-shuffle')"><span class="filter-icon">🔀</span> Shuffle</button>
                            <button class="filter-btn" data-filter="fx-tunnel" onclick="selectFilter('fx-tunnel')"><span class="filter-icon">🕳️</span> Tunnel</button>
                            <button class="filter-btn" data-filter="fx-spycam" onclick="selectFilter('fx-spycam')"><span class="filter-icon">🛰️</span> Spy Cam</button>
                        </div>
                    </div>
                </div>
                
                <div class="step-buttons">
                    <button class="btn btn-secondary" onclick="goToLayout()">← Back</button>
                    <button class="btn btn-primary btn-lg" onclick="goToCapture()">Next → Start Capture</button>
                </div>
            </div>
            
            <!-- STEP 3: Camera & Capture -->
            <div id="stepCapture" class="photobooth-step">
                <h2>📷 Capture Your Photos</h2>
                <p class="step-subtitle" id="captureSubtitle">Get ready to capture photo 1 of 4</p>
                
                <div class="filter-display capture-filter-header">
                    <span class="filter-display-label">Filter:</span>
                    <span class="filter-display-name" id="captureFilterName">RETRO CLASSIC</span>
                    <span class="filter-display-toggle">LIVE PREVIEW</span>
                </div>
                
                <!-- Filter Selector -->
                <div id="captureFilterSelector" class="capture-filter-selector">
                    <div class="capture-filter-options">
                        <button class="capture-filter-option active" data-filter="retro" onclick="changeCaptureFilter('retro')">⭐ RETRO CLASSIC</button>
                        <button class="capture-filter-option" data-filter="sepia" onclick="changeCaptureFilter('sepia')">📷 SEPIA</button>
                        <button class="capture-filter-option" data-filter="bw" onclick="changeCaptureFilter('bw')">⚫ B&W</button>
                        <button class="capture-filter-option" data-filter="vaporwave" onclick="changeCaptureFilter('vaporwave')">🌀 VAPORWAVE</button>
                        <button class="capture-filter-option" data-filter="neon" onclick="changeCaptureFilter('neon')">💫 NEON</button>
                        <button class="capture-filter-option" data-filter="cool" onclick="changeCaptureFilter('cool')">❄️ COOL</button>
                        <button class="capture-filter-option" data-filter="crowns" onclick="changeCaptureFilter('crowns')">👑 CROWN OF HEARTS</button>
                        
                        <div class="capture-filter-divider">
                            <button class="capture-filter-option" data-filter="mirror-normal" onclick="changeCaptureFilter('mirror-normal')">📸 NORMAL</button>
                            <button class="capture-filter-option" data-filter="mirror-left" onclick="changeCaptureFilter('mirror-left')">↔️ LEFT MIRROR</button>
                            <button class="capture-filter-option" data-filter="mirror-right" onclick="changeCaptureFilter('mirror-right')">↔️ RIGHT MIRROR</button>
                            <button class="capture-filter-option" data-filter="mirror-top" onclick="changeCaptureFilter('mirror-top')">↕️ TOP MIRROR</button>
                            <button class="capture-filter-option" data-filter="mirror-bottom" onclick="changeCaptureFilter('mirror-bottom')">↕️ BOTTOM MIRROR</button>
                            <button class="capture-filter-option" data-filter="mirror-quad" onclick="changeCaptureFilter('mirror-quad')">📊 QUAD MIRROR</button>
                            <button class="capture-filter-option" data-filter="mirror-upsidedown" onclick="changeCaptureFilter('mirror-upsidedown')">🔄 UPSIDE-DOWN</button>
                            <button class="capture-filter-option" data-filter="mirror-switch" onclick="changeCaptureFilter('mirror-switch')">🔀 SWITCH</button>
                            <button class="capture-filter-option" data-filter="mirror-kaleidoscope" onclick="changeCaptureFilter('mirror-kaleidoscope')">🎨 KALEIDOSCOPE</button>
                        </div>

                        <div class="capture-filter-divider">
                            <button class="capture-filter-option" data-filter="distort-spiral" onclick="changeCaptureFilter('distort-spiral')">🌀 SPIRAL</button>
                            <button class="capture-filter-option" data-filter="distort-twist" onclick="changeCaptureFilter('distort-twist')">🌪️ TWIST</button>
                            <button class="capture-filter-option" data-filter="distort-dent" onclick="changeCaptureFilter('distort-dent')">🕳️ DENT</button>
                            <button class="capture-filter-option" data-filter="distort-pinch" onclick="changeCaptureFilter('distort-pinch')">🤏 PINCH</button>
                            <button class="capture-filter-option" data-filter="distort-bulge" onclick="changeCaptureFilter('distort-bulge')">🔮 BULGE</button>
                            <button class="capture-filter-option" data-filter="distort-fisheye" onclick="changeCaptureFilter('distort-fisheye')">🐟 FISHEYE</button>
                            <button class="capture-filter-option" data-filter="distort-wedge" onclick="changeCaptureFilter('distort-wedge')">📐 WEDGE</button>
                            <button class="capture-filter-option" data-filter="distort-ripple" onclick="changeCaptureFilter('distort-ripple')">🌊 RIPPLE</button>
                            <button class="capture-filter-option" data-filter="distort-stretch" onclick="changeCaptureFilter('distort-stretch')">↔️ STRETCH</button>
                            <button class="capture-filter-option" data-filter="distort-stretch-portrait" onclick="changeCaptureFilter('distort-stretch-portrait')">↕️ STRETCH PORTRAIT</button>
                        </div>

                        <div class="capture-filter-divider">
                            <button class="capture-filter-option" data-filter="art-mono" onclick="changeCaptureFilter('art-mono')">⚪ MONO</button>
                            <button class="capture-filter-option" data-filter="art-lomo" onclick="changeCaptureFilter('art-lomo')">🌇 LOMO</button>
                            <button class="capture-filter-option" data-filter="art-comicbook" onclick="changeCaptureFilter('art-comicbook')">📚 COMIC BOOK</button>
                            <button class="capture-filter-option" data-filter="art-monoquad" onclick="changeCaptureFilter('art-monoquad')">◻️ MONO QUAD</button>
                            <button class="capture-filter-option" data-filter="art-lomoquad" onclick="changeCaptureFilter('art-lomoquad')">🟧 LOMO QUAD</button>
                            <button class="capture-filter-option" data-filter="art-comicstrip" onclick="changeCaptureFilter('art-comicstrip')">🗞️ COMIC STRIP</button>
                            <button class="capture-filter-option" data-filter="art-magazine" onclick="changeCaptureFilter('art-magazine')">📰 MAGAZINE</button>
                            <button class="capture-filter-option" data-filter="art-blackwhite" onclick="changeCaptureFilter('art-blackwhite')">⚫ BLACK &amp; WHITE</button>
                            <button class="capture-filter-option" data-filter="art-cartoon" onclick="changeCaptureFilter('art-cartoon')">🎭 CARTOON</button>
                        </div>

                        <div class="capture-filter-divider">
                            <button class="capture-filter-option" data-filter="tone-softfocus" onclick="changeCaptureFilter('tone-softfocus')">☁️ SOFT FOCUS</button>
                            <button class="capture-filter-option" data-filter="tone-hazydays" onclick="changeCaptureFilter('tone-hazydays')">🌤️ HAZY DAYS</button>
                            <button class="capture-filter-option" data-filter="tone-vintage" onclick="changeCaptureFilter('tone-vintage')">📷 VINTAGE</button>
                            <button class="capture-filter-option" data-filter="tone-rose" onclick="changeCaptureFilter('tone-rose')">🌹 ROSE</button>
                            <button class="capture-filter-option" data-filter="tone-retro" onclick="changeCaptureFilter('tone-retro')">🕹️ RETRO</button>
                            <button class="capture-filter-option" data-filter="tone-cocoa" onclick="changeCaptureFilter('tone-cocoa')">🍫 COCOA</button>
                            <button class="capture-filter-option" data-filter="tone-xpro" onclick="changeCaptureFilter('tone-xpro')">🎞️ X-PRO</button>
                            <button class="capture-filter-option" data-filter="tone-envy" onclick="changeCaptureFilter('tone-envy')">💚 ENVY</button>
                            <button class="capture-filter-option" data-filter="tone-zinc" onclick="changeCaptureFilter('tone-zinc')">🩶 ZINC</button>
                            <button class="capture-filter-option" data-filter="tone-thermal" onclick="changeCaptureFilter('tone-thermal')">🌡️ THERMAL</button>
                        </div>

                        <div class="capture-filter-divider">
                            <button class="capture-filter-option" data-filter="fx-fragment" onclick="changeCaptureFilter('fx-fragment')">🧩 FRAGMENT</button>
                            <button class="capture-filter-option" data-filter="fx-quadcam" onclick="changeCaptureFilter('fx-quadcam')">🎞️ QUAD CAM</button>
                            <button class="capture-filter-option" data-filter="fx-splitscreen" onclick="changeCaptureFilter('fx-splitscreen')">🪟 SPLIT SCREEN</button>
                            <button class="capture-filter-option" data-filter="fx-filmstrip" onclick="changeCaptureFilter('fx-filmstrip')">🎬 FILMSTRIP</button>
                            <button class="capture-filter-option" data-filter="fx-ghost" onclick="changeCaptureFilter('fx-ghost')">👻 GHOST</button>
                            <button class="capture-filter-option" data-filter="fx-colorghost" onclick="changeCaptureFilter('fx-colorghost')">🌈 COLOR GHOST</button>
                            <button class="capture-filter-option" data-filter="fx-trail" onclick="changeCaptureFilter('fx-trail')">✨ TRAIL</button>
                            <button class="capture-filter-option" data-filter="fx-shuffle" onclick="changeCaptureFilter('fx-shuffle')">🔀 SHUFFLE</button>
                            <button class="capture-filter-option" data-filter="fx-tunnel" onclick="changeCaptureFilter('fx-tunnel')">🕳️ TUNNEL</button>
                            <button class="capture-filter-option" data-filter="fx-spycam" onclick="changeCaptureFilter('fx-spycam')">🛰️ SPY CAM</button>
                        </div>
                    </div>
                </div>
                
                <div class="camera-section">
                    <video id="video" class="video-stream source-video" autoplay playsinline></video>
                    <canvas id="livePreviewCanvas" class="video-stream"></canvas>
                    <canvas id="canvas" class="hidden"></canvas>
                </div>
                
                <div class="capture-progress-container">
                    <div class="capture-progress-label">
                        <span id="photoCounter">Photo 1 of 4</span>
                    </div>
                    <div class="capture-progress">
                        <div id="progressFill" style="width: 0%"></div>
                    </div>
                </div>
                
                <div class="capture-buttons">
                    <button id="startCameraBtn" class="btn btn-primary btn-lg" onclick="startCamera()">Start Camera</button>
                    <button id="capturePhotoBtnMain" class="btn btn-capture btn-lg" disabled onclick="capturePhoto()">
                        📷 CAPTURE
                    </button>
                </div>
                
                <div class="capture-buttons" style="margin-top: 10px;">
                    <button class="btn btn-secondary" onclick="goBackStep()">← Back</button>
                    <button id="retakeCaptureBtn" class="btn btn-secondary" disabled onclick="retakePhotos()">🔄 Retake All</button>
                    <button id="nextToPreviewBtn" class="btn btn-secondary" disabled onclick="goToPreview()">Next → Preview</button>
                </div>
                
                <div class="info-section">
                    <p id="captureStatus" class="status-message">Click 'Start Camera' to begin</p>
                </div>
            </div>
            
            <!-- STEP 4: Preview & Customize -->
            <div id="stepPreview" class="photobooth-step">
                <h2>🎬 Your Photo Strip</h2>
                <p class="step-subtitle">Preview and customize your strip</p>
                
                <div class="strip-layout-selector">
                    <label class="strip-layout-label">✨ Strip Style:</label>
                    <div class="strip-layout-slider">
                        <button type="button" class="strip-slider-nav" onclick="scrollStripLayouts(-1)" aria-label="Previous strip layouts">◀</button>
                        <div id="stripLayoutViewport" class="strip-layout-viewport">
                            <div class="strip-layout-buttons">
                                <button class="strip-layout-btn active" data-layout="filmstrip" onclick="selectStripLayout('filmstrip')">🎞️ Filmstrip</button>
                                <button class="strip-layout-btn" data-layout="grid2x2" onclick="selectStripLayout('grid2x2')">⬜ 2x2 Grid</button>
                                <button class="strip-layout-btn" data-layout="polaroid" onclick="selectStripLayout('polaroid')">🎨 Polaroid Wall</button>
                                <button class="strip-layout-btn" data-layout="compact" onclick="selectStripLayout('compact')">📱 Compact</button>
                                <button class="strip-layout-btn" data-layout="postcard" onclick="selectStripLayout('postcard')">🖼️ Postcard Grid</button>
                                <button class="strip-layout-btn" data-layout="triptych" onclick="selectStripLayout('triptych')">🧩 Triptych</button>
                                <button class="strip-layout-btn" data-layout="storyboard" onclick="selectStripLayout('storyboard')">📚 Storyboard</button>
                                <button class="strip-layout-btn" data-layout="contactsheet" onclick="selectStripLayout('contactsheet')">🗂️ Contact Sheet</button>
                                <button class="strip-layout-btn" data-layout="gallerywall" onclick="selectStripLayout('gallerywall')">🧱 Gallery Wall</button>
                                <button class="strip-layout-btn" data-layout="neonmatrix" onclick="selectStripLayout('neonmatrix')">🟩 Neon Matrix</button>
                                <button class="strip-layout-btn" data-layout="socialfeed" onclick="selectStripLayout('socialfeed')">📱 Social Feed</button>
                                <button class="strip-layout-btn" data-layout="noirx" onclick="selectStripLayout('noirx')">🖤 Noir X</button>
                                <button class="strip-layout-btn" data-layout="doodle" onclick="selectStripLayout('doodle')">✍️ Doodle Pop</button>
                                <button class="strip-layout-btn" data-layout="music" onclick="selectStripLayout('music')">🎵 Music Player</button>
                                <button class="strip-layout-btn" data-layout="minimalwhite" onclick="selectStripLayout('minimalwhite')">🤍 Minimal White</button>
                            </div>
                        </div>
                        <button type="button" class="strip-slider-nav" onclick="scrollStripLayouts(1)" aria-label="Next strip layouts">▶</button>
                    </div>
                </div>
                 
                <div id="previewStrip" class="preview-full-strip preview-filmstrip">
                    <!-- Dynamic photos will be added here -->
                </div>
                
                <!-- Polaroid Customization (shown only for polaroid layout) -->
                <div id="polaroidCustomize" class="customize-section" style="display: none;">
                    <label class="customize-label">📸 Polaroid Style:</label>
                    
                    <div class="polaroid-options">
                        <div class="polaroid-option-group">
                            <label>Frame Color:</label>
                            <div class="polaroid-color-buttons">
                                <button class="polaroid-color-btn active" style="background-color: white;" onclick="setPolaroidFrameColor('white')" title="White"></button>
                                <button class="polaroid-color-btn" style="background-color: #f5e6d3;" onclick="setPolaroidFrameColor('#f5e6d3')" title="Retro Cream"></button>
                                <button class="polaroid-color-btn" style="background-color: #fffacd;" onclick="setPolaroidFrameColor('#fffacd')" title="Pale Yellow"></button>
                                <button class="polaroid-color-btn" style="background-color: #ffe4e1;" onclick="setPolaroidFrameColor('#ffe4e1')" title="Pastel Pink"></button>
                                <button class="polaroid-color-btn" style="background-color: #fff0f5;" onclick="setPolaroidFrameColor('#fff0f5')" title="Lavender Blush"></button>
                            </div>
                        </div>
                        
                        <div class="polaroid-option-group">
                            <label>Caption:</label>
                            <input type="text" id="polaroidCaption" maxlength="30" placeholder="Add text to photos..." class="polaroid-caption-input" onchange="updatePolaroidCaption()" oninput="updatePolaroidCaption()">
                        </div>
                        
                        <div class="polaroid-option-group">
                            <label>Style:</label>
                            <div class="polaroid-style-buttons">
                                <button class="polaroid-style-btn active" onclick="setPolaroidStyle('classic')">🎨 Classic</button>
                                <button class="polaroid-style-btn" onclick="setPolaroidStyle('straight')">📏 Straight</button>
                                <button class="polaroid-style-btn" onclick="setPolaroidStyle('scattered')">🌀 Scattered</button>
                                <button class="polaroid-style-btn" onclick="setPolaroidStyle('magazine')">📑 Magazine</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="customize-section">
                    <label class="customize-label">🎨 Y2K Frame Design:</label>
                    <div class="frame-design-buttons">
                        <button class="frame-design-btn active" onclick="setFrameDesign('y2k-stars')" title="Y2K Stars">✦★</button>
                        <button class="frame-design-btn" onclick="setFrameDesign('cyber-hearts')" title="Cyber Hearts">♡✧</button>
                        <button class="frame-design-btn" onclick="setFrameDesign('sparkle-cloud')" title="Sparkle Cloud">☁✦</button>
                        <button class="frame-design-btn" onclick="setFrameDesign('pixel-smile')" title="Pixel Smile">◕‿◕</button>
                        <button class="frame-design-btn" onclick="setFrameDesign('glitch-butterfly')" title="Glitch Butterfly">🦋✦</button>
                    </div>
                </div>
                
                <div class="preview-actions">
                    <button class="btn btn-secondary" onclick="goToCapture()">← Retake</button>
                    <button class="btn btn-secondary" id="downloadStripBtn" onclick="downloadStrip()">💾 Download Strip</button>
                    <button class="btn btn-secondary" id="printStripBtn" onclick="printStrip()">🖨️ Print Strip</button>
                    <button class="btn btn-primary btn-lg" onclick="startOver()">🔄 Start Over</button>
                </div>
            </div>
            
            <!-- Gallery Section -->
            <div class="gallery-section">
                <h2>📸 GALLERY 📸</h2>
                <div id="gallery" class="gallery-grid">
                    <p class="empty-message">No memories captured yet...</p>
                </div>
            </div>
            
            <div class="info-section">
                <p id="status" class="status-message">Welcome to Retro Photobooth!</p>
            </div>
        </div>
    </div>
    
    <script src="js/script.js?v=20260319ab"></script>
    <script>
        // Initialize filter display on page load
        document.addEventListener('DOMContentLoaded', function() {
            initializeDOM();
            const filterNameMap = {
                'retro': 'RETRO CLASSIC',
                'sepia': 'SEPIA',
                'bw': 'B&W',
                'vaporwave': 'VAPORWAVE',
                'neon': 'NEON',
                'cool': 'COOL',
                'crowns': 'CROWN OF HEARTS'
            };
            const displayName = filterNameMap['retro'] || 'RETRO CLASSIC';
            const filterDisplay = document.getElementById('captureFilterName');
            if (filterDisplay) {
                filterDisplay.textContent = displayName;
            }
            
            // Capture filters stay visible for live preview selection
        });
    </script>
</body>
</html>
