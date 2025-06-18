  // Banner Animation
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');
    const bannerWrapper = document.getElementById('scroll-banner-wrapper');
    const container = document.querySelector('.container');
    const banner = document.getElementById('banner');

    function calculateTotalScroll() {
      return bannerWrapper.offsetHeight - window.innerHeight;
    }

    function updateTransforms() {
      const totalScroll = calculateTotalScroll();
      const scrollY = window.scrollY;
      const wrapperTop = bannerWrapper.offsetTop;
      const relativeScroll = scrollY - wrapperTop;
      const progress = totalScroll > 0 ? Math.min(Math.max(relativeScroll / totalScroll, 0), 1) : 0;

      const translateYImages = progress * 100;
      const bannerRect = banner.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const initialTopOffset = containerRect.top - bannerRect.top;
      const maxTranslate = -initialTopOffset + 5;
      const translateYText = -progress * initialTopOffset + 5;
      const isMobile = window.innerWidth <= 480;
      const rotate1 = (1 - progress) * (isMobile ? -8 : -10);
      const rotate2 = (1 - progress) * (isMobile ? 8 : 10);
      const rotate3 = (1 - progress) * (isMobile ? -8 : -10);
      const translateX1 = (1 - progress) * 33.33;
      const translateX3 = (1 - progress) * -33.33;

      img1.style.transform = `translateY(${translateYImages}px) rotate(${rotate1}deg) translateX(${translateX1}%)`;
      img2.style.transform = `translateY(${translateYImages}px) rotate(${rotate2}deg)`;
      img3.style.transform = `translateY(${translateYImages}px) rotate(${rotate3}deg) translateX(${translateX3}%)`;
      container.style.transform = `translateY(${Math.max(translateYText, maxTranslate)}px)`;
    }

    window.addEventListener('scroll', updateTransforms);
    window.addEventListener('resize', updateTransforms);
    updateTransforms();

    // Scroll Highlight Animation
    const highlightParagraph = document.getElementById('highlight-text');
    const highlightWords = highlightParagraph.textContent.trim().split(' ').map(word => `<span class="word">${word}</span>`);
    highlightParagraph.innerHTML = highlightWords.join(' ');

    const wordElements = document.querySelectorAll('.word');
    const scrollHighlightContainer = document.querySelector('.scroll-highlight-container');
    const stickyHighlightSection = document.querySelector('.sticky-highlight-section');

    function highlightOnScroll() {
      const containerRect = scrollHighlightContainer.getBoundingClientRect();
      const totalHeight = scrollHighlightContainer.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - scrollHighlightContainer.offsetTop;
      const scrollProgress = Math.min(1, Math.max(0, scrolled / totalHeight));

      const totalWords = wordElements.length;
      const wordsToHighlight = Math.floor(scrollProgress * totalWords);

      wordElements.forEach((word, index) => {
        if (index <= wordsToHighlight) {
          word.classList.add('highlight');
        } else {
          word.classList.remove('highlight');
        }
      });
    }

    window.addEventListener('scroll', highlightOnScroll);
    highlightOnScroll();

    // GSAP Animations for Container-1
    gsap.registerPlugin(ScrollTrigger);

    function createContainerAnimation(containerClass, containerNewClasses, centerImageNewClasses) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerClass,
          start: "top top",
          end: "+=2400",
          scrub: 1,
          pin: true,
          anticipatePin: true
        }
      });

      gsap.set(`${containerClass} > .text-content`, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(`${containerClass} > .text-content-right`, { clipPath: "inset(100% 0 0 0)" });

      tl.fromTo(`${containerClass} > .text-content`, 
        { clipPath: "inset(100% 0 0 0)" }, 
        { clipPath: "inset(0% 0 0 0)", duration: 1 }, 0)
        .fromTo(`${containerClass} > .text-content-right`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 0)
        .to(`.${containerNewClasses[0]}`, { clipPath: "inset(0% 0 0 0)", duration: 2 }, 2)
        .to(`${containerClass} > .text-content`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 2)
        .to(`${containerClass} > .text-content-right`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 2)
        .fromTo(`.${containerNewClasses[0]} .text-content`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 3)
        .fromTo(`.${containerNewClasses[0]} .text-content-right`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 3)
        .to(`.${containerNewClasses[1]}`, { clipPath: "inset(0% 0 0 0)", duration: 2 }, 4)
        .to(`.${containerNewClasses[0]} .text-content`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 4)
        .to(`.${containerNewClasses[0]} .text-content-right`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 4)
        .fromTo(`.${containerNewClasses[1]} .text-content`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 5)
        .fromTo(`.${containerNewClasses[1]} .text-content-right`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 5)
        .to(`.${containerNewClasses[2]}`, { clipPath: "inset(0% 0 0 0)", duration: 2 }, 6)
        .to(`.${containerNewClasses[1]} .text-content`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 6)
        .to(`.${containerNewClasses[1]} .text-content-right`, 
          { clipPath: "inset(0 0 100% 0)", duration: 1 }, 6)
        .fromTo(`.${containerNewClasses[2]} .text-content`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 7)
        .fromTo(`.${containerNewClasses[2]} .text-content-right`, 
          { clipPath: "inset(100% 0 0 0)" }, 
          { clipPath: "inset(0% 0 0 0)", duration: 1 }, 7);

      centerImageNewClasses.forEach((centerImageNewClass, index) => {
        tl.to(`.${centerImageNewClass}`, { clipPath: "inset(0% 0 0 0)", duration: 2 }, (index + 1) * 2);
      });
    }

    createContainerAnimation(
      '.container-1',
      ['container-1-new', 'container-1-new-2', 'container-1-new-3'],
      ['center-image-1-new', 'center-image-new-2', 'center-image-1-new-3']
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky-container",
        start: "top center",
        end: "center center",
        scrub: true,
      }
    })
    .to(".img-left", {
      xPercent: -120,
      rotation: -8,
    }, 0)
    .to(".img-right", {
      xPercent: 120,
      rotation: 8,
    }, 0);

    // Custom Cursor Movement
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });