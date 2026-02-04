# 📁 Public 폴더 (정적 파일)

이 폴더의 파일들은 웹사이트에서 바로 접근할 수 있습니다.

---

## 📂 폴더 구조

```
public/
├── images/          # 이미지 파일
│   ├── hero/        # 히어로 섹션 이미지 (배경, 메인 이미지)
│   ├── logos/       # 로고 파일
│   ├── icons/       # 아이콘 이미지
│   └── thumbnails/  # 썸네일/Poster 이미지 (영상용)
├── videos/          # 영상 파일
│   └── hero/        # 히어로 배경 영상
├── fonts/           # 폰트 파일 (이미 존재하는 경우)
└── favicon.ico      # 파비콘
```

---

## 🖼️ 이미지 파일 넣는 법

### 1. 히어로 섹션 배경 이미지
**위치**: `public/images/hero/`

```
public/images/hero/
├── hero-bg.webp        # 메인 배경 (WebP 권장)
├── hero-bg.jpg         # Fallback 배경 (JPG)
└── hero-poster.webp    # 영상 Poster 이미지
```

**사용 예시**:
```tsx
<img src="/images/hero/hero-bg.webp" alt="Hero Background" />
```

---

### 2. 로고 파일
**위치**: `public/images/logos/`

```
public/images/logos/
├── logo.svg            # 메인 로고 (SVG 권장)
├── logo-white.svg      # 흰색 로고 (어두운 배경용)
└── logo.png            # PNG 버전 (Fallback)
```

**사용 예시**:
```tsx
<img src="/images/logos/logo.svg" alt="Company Logo" />
```

---

### 3. 아이콘
**위치**: `public/images/icons/`

```
public/images/icons/
├── check.svg
├── arrow.svg
└── close.svg
```

---

## 🎬 비디오 파일 넣는 법

### 히어로 배경 영상
**위치**: `public/videos/hero/`

```
public/videos/hero/
├── hero-video.webm     # WebM 포맷 (권장, 용량 작음)
├── hero-video.mp4      # MP4 포맷 (Fallback)
└── hero-poster.webp    # 영상 썸네일 (로딩 전 표시)
```

**권장 스펙**:
- **해상도**: 1920x1080 (Full HD)
- **용량**: 10-15MB (WebM: 6-10MB, MP4: 15-20MB)
- **길이**: 20-45초
- **코덱**: WebM (VP9), MP4 (H.264)

**사용 예시**:
```tsx
<video autoPlay muted loop playsInline poster="/images/thumbnails/hero-poster.webp">
  <source src="/videos/hero/hero-video.webm" type="video/webm" />
  <source src="/videos/hero/hero-video.mp4" type="video/mp4" />
</video>
```

---

## 📏 이미지 최적화 권장사항

### 포맷
1. **WebP** (최우선) - 가장 작은 용량, 최신 브라우저 지원
2. **AVIF** (선택) - WebP보다 더 작지만 지원 제한적
3. **JPG** (Fallback) - 호환성 최고
4. **PNG** (투명도 필요 시)
5. **SVG** (로고, 아이콘)

### 용량 가이드
| 이미지 유형 | 권장 용량 | 해상도 |
|------------|----------|--------|
| 히어로 배경 | 100-300KB | 1920x1080 |
| 로고 (SVG) | 10-50KB | 벡터 |
| 아이콘 | 5-20KB | 24x24 ~ 64x64 |
| 썸네일 | 50-100KB | 1280x720 |

### 최적화 도구
```bash
# ImageMagick으로 WebP 변환
convert hero-bg.jpg -quality 85 hero-bg.webp

# 또는 온라인 도구 사용
# - https://squoosh.app/ (Google)
# - https://tinypng.com/ (PNG/JPG)
```

---

## 🎥 비디오 최적화 (FFmpeg)

### WebM 변환 (권장)
```bash
ffmpeg -i input.mp4 \
  -vcodec libvpx-vp9 \
  -crf 31 \
  -b:v 0 \
  -vf scale=1920:1080 \
  -b:a 192k \
  -c:a libopus \
  hero-video.webm
```

### MP4 최적화
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 21 \
  -preset slow \
  -vf scale=1920:1080 \
  -b:v 6M \
  -b:a 192k \
  -movflags +faststart \
  hero-video.mp4
```

### Poster 이미지 생성
```bash
# 영상 첫 프레임을 이미지로 추출
ffmpeg -i hero-video.mp4 -vframes 1 -q:v 2 hero-poster.jpg

# WebP로 변환
convert hero-poster.jpg -quality 85 hero-poster.webp
```

---

## 📝 접근 경로

public 폴더의 파일은 **루트 경로(`/`)** 로 접근합니다:

| 파일 경로 | 웹 URL |
|----------|--------|
| `public/images/logo.svg` | `/images/logo.svg` |
| `public/videos/hero.mp4` | `/videos/hero.mp4` |
| `public/favicon.ico` | `/favicon.ico` |

**주의**: `public` 경로는 URL에 포함하지 않습니다!

---

## ✅ 체크리스트

파일 추가 전 확인사항:

### 이미지
- [ ] WebP 포맷 우선 사용
- [ ] 해상도 적절히 조정 (너무 크지 않게)
- [ ] 용량 100-300KB 이하 (히어로 배경 기준)
- [ ] 파일명은 영문 소문자, 하이픈 사용 (예: `hero-bg.webp`)

### 비디오
- [ ] WebM + MP4 두 포맷 모두 제공
- [ ] Poster 이미지 필수 포함
- [ ] 용량 10-15MB 이하 (인도네시아 환경 고려)
- [ ] faststart 플래그 적용 (MP4)

---

## 🚀 빠른 시작

### 1. 파일 복사
```bash
# 이미지 복사
cp your-images/* public/images/hero/

# 비디오 복사
cp your-videos/* public/videos/hero/
```

### 2. 사용 예시
```tsx
// 컴포넌트에서 사용
export default function Hero() {
  return (
    <div className="relative">
      <video autoPlay muted loop playsInline>
        <source src="/videos/hero/hero-video.webm" type="video/webm" />
        <source src="/videos/hero/hero-video.mp4" type="video/mp4" />
      </video>

      <img src="/images/logos/logo.svg" alt="Logo" />
    </div>
  );
}
```

---

## 📚 관련 문서

- [Next.js 정적 파일 제공](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
- [캐싱 전략](../../docs/CACHING.md)
- [성능 최적화](../../docs/DEPLOYMENT.md)

---

**마지막 업데이트**: 2026-02-04
