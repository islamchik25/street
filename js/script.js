class Scroll {
    constructor(obj) {
        if (typeof obj.el == 'string') {
            this.el = document.querySelector(obj.el);
            // console.dir(this.el);
        } else if (set.el instanceof HTMLElement) { // наследуется ли от HTMLElemrnt
            this.el = set.el
        }
        this.el.style.position = 'fixed';
        this.top = obj.top; // храним начальное значение отступа в объекте
        this.unit = obj.unit;
        // this.el.style.top = this.top + "px";
        this.scroll();
        window.addEventListener('scroll', () => this.scroll());
        window.addEventListener('resize', () => this.scroll());
    }
    scroll() {
        this.menuTop = this.scrollNumber();
        // pageYOffset - хранит расстояние смещения вниз от верхнего края страницы
        console.log(window.pageYOffset);
        if (this.menuTop - pageYOffset > 0) {
            this.el.style.top = this.menuTop - pageYOffset + "px";
        } else {
            this.el.style.top = 0;
        }
    }
    scrollNumber() {
        if (this.unit == 'px') {
            return this.top >= 0 ? this.top : 0;
        } else if (this.unit == '%' || this.unit == undefined) {
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight;
        }
    }
    calc(height, top) {
        return height / 100 * top;
    }
}


// 
class parallax {
    constructor(obj) {
        if (typeof obj.el == "string") {
            this.element = document.querySelector(obj.el);
        } else if (obj.el instanceof HTMLElement) { // instanceof - проверяет наличие в наследниках класса HTMLElement
            this.element = obj.el;
        }
        this.parent = this.element.parentElement;
        this.parent.style.overflow = "hidden";
        this.scroll()
        window.addEventListener("scroll", ()=>{this.scroll()});
        window.addEventListener("resize", ()=>{this.scroll()});
    }
    scroll() {
        this.viewport = this.parent.getBoundingClientRect()
        console.log(this.viewport);
        console.log(innerHeight);
        if (innerHeight < this.viewport.height) {
            let elTop = innerHeight / 2;
            if (innerHeight > this.viewport.top && this.viewport.top > 0) {
                this.translateY = elTop - (innerHeight - this.viewport.top)/2;
            } else if(innerHeight > this.viewport.bottom && this.viewport.bottom > 0) {
                this.translateY = -(innerHeight - this.viewport.bottom)/2;
            } else {
                this.translateY = 0;
            }
            this.element.style.transform = `translateY(${-this.translateY}px)`;
        }
        else{
            let elTop = this.viewport.height / 2;
            if (innerHeight > this.viewport.top && this.viewport.bottom > innerHeight) {
                this.translateY = elTop - (innerHeight - this.viewport.top)/2;
            } else if(this.viewport.top < 0 && this.viewport.bottom > 0) {
                this.translateY = this.viewport.top/2;
            } else {
                this.translateY = 0;
            }
            this.element.style.transform = `translateY(${-this.translateY}px)`;
        }
    }
}

const p = new parallax({
    el: '.parallax',
})