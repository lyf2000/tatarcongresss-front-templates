'use strict';

document.querySelectorAll('#app-footer .menu h4').forEach(el => {
    el.addEventListener('click', (e) => {
        const parent = e.currentTarget.parentNode;

        [...parent.parentNode.children].filter((child) => child !== el).forEach(i => {
            i.classList.remove('active');
        });

        parent.classList.toggle('active');
    }, {passive: true});
});

document.querySelectorAll('#app-header .menu > li > a').forEach(el => {
    el.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            e.preventDefault();

            const parent = e.currentTarget.parentNode;

            [...parent.parentNode.children].filter((child) => child !== el).forEach(i => {
                i.classList.remove('active');
            });

            parent.classList.toggle('active');
        }
    });
});

document.querySelector('#app-header .burger').addEventListener('click', () => {
    document.getElementById('app-header').classList.toggle('mobile');
    document.body.classList.toggle('overflow-hidden');
});

document.querySelectorAll('.embla').forEach(wrapperNode => {
    const viewportNode = wrapperNode.querySelector('.embla__viewport')
    const prevButtonNode = wrapperNode.querySelector('.embla__prev')
    const nextButtonNode = wrapperNode.querySelector('.embla__next')
    const dotsNode = wrapperNode.querySelector('.embla__dots')

    const emblaApi = EmblaCarousel(viewportNode, {
        loop: true,
        align: 'start'
    })

    if (prevButtonNode) {
        prevButtonNode.addEventListener('click', () => emblaApi.scrollPrev(), false)
    }
    if (nextButtonNode) {
        nextButtonNode.addEventListener('click', () => emblaApi.scrollNext(), false)
    }

    const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {
        let dotNodes = []

        const addDotBtnsWithClickHandlers = () => {
            dotsNode.innerHTML = emblaApi
                .scrollSnapList()
                .map(() => '<button class="embla__dot" type="button"></button>')
                .join('')

            const scrollTo = (index) => {
                emblaApi.scrollTo(index)
            }

            dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
            dotNodes.forEach((dotNode, index) => {
                dotNode.addEventListener('click', () => scrollTo(index), false)
            })
        }

        const toggleDotButtonsActive = () => {
            const previous = emblaApi.previousScrollSnap()
            const selected = emblaApi.selectedScrollSnap()
            dotNodes[previous].classList.remove('embla__dot--selected')
            dotNodes[selected].classList.add('embla__dot--selected')
        }

        addDotBtnsWithClickHandlers()
        toggleDotButtonsActive()

        emblaApi
            .on('reinit', addDotBtnsWithClickHandlers)
            .on('reinit', toggleDotButtonsActive)
            .on('select', toggleDotButtonsActive)
    }

    addDotButtonAndClickHandlers(emblaApi, dotsNode)
});
