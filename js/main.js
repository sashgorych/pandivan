let lang = document.querySelector('html').dataset.lang;
var lockBgTimer;

//init variable of screen height
(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh2 = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh2}px`);

    });
})()

//add smooth scroll when click on link
$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
            return false;
        }
    }
});


//header scripts start
//catalog start
$('.catalog-btn button').click(function (e){
    if($('.fixed-menu-catalog').hasClass('active')){
        hideCatalogMenu()
    }else {
        showCatalogMenu()
    }
})
function showCatalogMenu(){
    closePageMenu()
    lockBg()
    $('.fixed-menu-catalog').addClass('active')
    document.querySelector('.fixed-menu-catalog .has-drop').querySelector('.level-2').classList.add('displ')
    $('header').addClass('catalog-view')
}
function hideCatalogMenu(){
    unlockBg()
    $('.fixed-menu-catalog').removeClass('active')
    $('header').removeClass('catalog-view')
}
$('.close-catalogMenu').click(function (e){
    hideCatalogMenu()
})
$('#fixed-catalog-bg').click(function (e){
    hideCatalogMenu()
})
//catalog end
$('.open_auth').click(function (e){
    closePageMenu()

    openAuthPopup()
})
$('.open_cart').click(function (e){
    closePageMenu()
    openCart()
})
function openAuthPopup(){
    lockBg()
    $('#auth_popup').addClass('active')
    $('#auth_popup + .side-menu__bg_popup2').click(function () {
        unlockBg()
    })
}
function openCart(){
    hideCatalogMenu()
    lockBg()
    $('#cart-popup').addClass('active')
    $('#cart-popup + .side-menu__bg_popup2').click(function () {
        unlockBg()
    })
}
function hideCart(){
    unlockBg()
    $('#cart-popup').removeClass('active')
}
$('.main-page-top .menu-wrapper').hover(function (){
    $('.menu__bg').addClass('active')
})
$('.menu__bg').hover(function (){
    $('.menu__bg').removeClass('active')
})


$('.open-mobile-search').click(function (){
    showSearch()
})
$('.mobile-close-btn').click(function (){
    hideSearch()
})
$('.search-side-menu-bg').click(function (){
    hideSearch()
})
function showSearch(){
    hideCart()
    hideCatalogMenu()
    closePageMenu()
    $('.search-side-menu-bg').addClass('active')

    $('.search-container').addClass('show')
}
function hideSearch(){
    $('.search-container').removeClass('show')
    $('.search-side-menu-bg').removeClass('active')
}
//fix header whle scroll
{
    var timer1;
    var doc = document.documentElement;
    var w = window;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;
    var fixedProccess = false;
    var checkScroll = function () {
        curScroll = w.scrollY || doc.scrollTop;

        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        } else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }
        if (curScroll > 50) {
            fixHeaderAnimate()
        } else {
            if (curScroll < 50) {
                if ($('body').attr('data-pos') > 50) {
                    return
                }
                hideFixedHeader()
            }
        }
        prevScroll = curScroll;
    };
    window.addEventListener('scroll', checkScroll);

    function fixHeaderAnimate() {
        document.querySelector('.header').classList.add('fixed')

    }

    function hideFixedHeader() {
        clearTimeout(timer1)
        $('.header').removeClass('fixed')
    }
}

// default popup start
function showDefaultPopup(titleText = "", textHtml = "") {
    let popup = document.querySelector('.content_popup')
    if (popup) {
        showDarkMenuBg()
        lockBg()
        let title = document.querySelector('.content_popup .popup_title')
        let content = document.querySelector('.content_popup .text_content')
        title.innerHTML = titleText;
        content.innerHTML = textHtml;
        popup.classList.add('active')
    }
}

function hideDefaultPopup() {
    hideDarkMenuBg()
    unlockBg()
    document.querySelector('.content_popup').classList.remove('active')

}

//default popup end


//favourite start
{
    let favourite = [];
    $(document).ready(function () {
        favourite = getFavFromLocalStorage();
    })

    function setAllFavFromStorage(arr) {
        favourite = arr;
        setFavToLocalStorage()
    }

    function getAllFavFromStorage() {
        if (favourite.length == 0) {
            return false
        }
        ;
        return favourite;
    }

    function existsInFav(id) {
        return isInArr(favourite, id)
    }

    function addFavToStorage(rid) {
        addFavToArray(rid);
    }

    function removeFavFromStorage(rid) {
        let index = getPositionInArr(favourite, rid)
        removeFavFromArray(index)
    }

    function isInArr(arr, el) {
        if (arr.indexOf(el) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    function getPositionInArr(arr, el) {
        return arr.indexOf(el);
    }

    function removeFavFromArray(index) {
        favourite.splice(index, 1);
        setFavToLocalStorage()
    }

    function addFavToArray(id) {
        favourite.push(id)
        setFavToLocalStorage()
    }

    function setFavToLocalStorage() {
        localStorage.setItem('favourite', JSON.stringify(favourite))
    }

    function getFavFromLocalStorage() {
        if (!(localStorage.getItem('favourite') == 'undefined')) {
            return JSON.parse(localStorage.getItem('favourite'))
        } else {
            return []
        }

    }
}
//favourite end


//menu start----------------------------------------
//common scripts
{
    function unlockBg() {
        clearMarginInsteadScrollBody();
        $("body").removeClass('locked');
        $(window).scrollTop($('body').attr('data-pos'));
    }

    function lockBg() {
        makeMarginInsteadScrollBody()
        // when popup opens
        $('body').attr('data-pos', $(window).scrollTop()); // get actual scrollpos
        $('body').addClass('locked'); // add class to body
        $('.layout').scrollTop($('body').attr('data-pos')); // let wrapper scroll to scrollpos

    }

    function showLoadingGif() {
        let isExist = document.querySelector('.site_loading_gif');
        let isExist2 = document.querySelector('.side-menu__bg_loading');
        if (!isExist) {
            document.querySelector('body').insertAdjacentHTML('beforeEnd', `<div class="side-menu__bg_loading active"><img src="/images/loading.gif" width="40px" height="40px" class="site_loading_gif active" alt="load"></div>`)
        } else {
            isExist.classList.add('active')
            isExist2.classList.add('active')
        }
    }

    function hideLoadingGif() {
        let isExist = document.querySelector('.site_loading_gif');
        let isExist2 = document.querySelector('.side-menu__bg_loading');
        if (isExist) {
            isExist.classList.remove('active')
            isExist2.classList.remove('active')
        }
    }

    function insertLoading() {
        let isExist = document.querySelector('.side-menu__bg').querySelector('.load_bg');
        if (!isExist) {
            document.querySelector('.side-menu__bg').insertAdjacentHTML('beforeEnd', `<img src="/images/loading.gif" width="40px" height="40px" class="load_bg" alt="load">`)
        }
    }

    function showDarkMenuBg(additionalClass, showLoad = false) {
        if (showLoad) {
            insertLoading()
            $('.side-menu__bg').addClass('active-load')
        }
        if (additionalClass) {
            $('.side-menu__bg').addClass(additionalClass)

        } else {
            $('.side-menu__bg').addClass('active')
        }
    }

    function isLoadingProcess() {
        let loadingDiv = document.querySelector('.site_loading_gif');
        let isLoadingProcessVar = false;
        if (loadingDiv) {
            isLoadingProcessVar = loadingDiv.classList.contains('active');
        }
        return isLoadingProcessVar;

    }

    function hideDarkMenuBg(additionalClass) {
        if (isLoadingProcess()) {
            return
        }
        if (additionalClass) {
            $('.side-menu__bg').removeClass(additionalClass)

        } else {
            $('.side-menu__bg').removeClass('active')
        }
        hideLoadingGif()
        $('.side-menu__bg').removeClass('active-load')

    }

    function makeMarginInsteadScrollBody() {
        $('.layout ').css('padding-right', (window.innerWidth - $('body').width()) + 'px');
    }

    function clearMarginInsteadScrollBody() {
        $('.layout').css('padding-right', 0 + 'px');
    }


    function closeAllMenus() {
        closePageMenu()
        hideMobileSearchBlock()
        hidePopup();

    }

//main menu.close menu when click in background
    $('.side-menu__bg').click(function (e) {
        closeAllMenus();
        hideDarkMenuBg();
        unlockBg();

    })

}


$('.current-language').click(function (e) {
    e.preventDefault()
    if (!$('.language-list').hasClass('active')) {
        $('.language-list').addClass('active')
    } else {
        $('.language-list').removeClass('active')

    }
})

//header scripts end -----------------------------------------------------------------------------

//sliders start
let prevPercent = 0;

function round_custom(num, step) {
    return Math.floor(num / step) * step;
}

function createNavsTemplate(n,actIndex) {
    if (n == 1) return;
    let str2 = ``;
    for (let i = 0; i < n; i++) {
        if (i+1 == actIndex) {
            str2 += `<div class="nav-itm nav-itm-active" data-in="${i + 1}"></div>`
        } else {
            str2 += `<div class="nav-itm" data-in="${i + 1}"></div>`
        }
    }
    return str2;
}

function afterInitProducts() {
    $('.products-container .item .img').each((i, el) => {
        let activeIndex = $(el).find('.img-list img.main-img').attr('data-in');

        let count21 = $(el).find('.img-list img').length || 1;
        $(el).attr('data-child', count21)
        $(el).find(".img-navs").html(createNavsTemplate(count21,activeIndex))
    })
    document.querySelector('body').style.setProperty('--itmheight',$('.products-container .item').css('height'));
    $('.products-container .item').mouseleave(function (e) {
        $(this).find(".img").removeClass('x');
    })
    $('.products-container .item .img').mousemove(function (e) {
        initCatalogProducItemImageChange($(this),e)

    })
}

//afterInitProducts()


function initCatalogProducItemImageChange(th,e){
    let imageParentBlock = e.target;

    if(!e.target.classList.contains("img")){
        imageParentBlock = e.target.closest('.img');
    }
    // let th = $(this)
    // console.log(e, th)
    var rect = imageParentBlock.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    if (x < 0) {
        x = 0
    }
    let pos;
    let childCount = $(th).attr('data-child');
    let step = Math.trunc(100 / (+($(th).attr('data-child'))));
    console.log(e.target.getBoundingClientRect().width);
    if (!!imageParentBlock.getBoundingClientRect().width) {
        pos = (x * 100 / imageParentBlock.getBoundingClientRect().width)
        console.log(pos);
        pos = round_custom(pos, step);

    } else {
        return;
    }
    // console.log(prevPercent);
    // console.log(pos);
    if (!(prevPercent == pos)) {
        $(th).addClass('x')
        if (childCount == "1") {
            return;
        }
        console.log(pos);
        $(th).find('.nav-itm-active').removeClass('nav-itm-active')
        $(th).find('.active-img').removeClass('active-img')

        if (childCount == "2") {
            if (pos == 0) {
                $(th).find('.img-navs .nav-itm:nth-child(1)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(1)').addClass('active-img')
            }
            if (pos == 50) {
                $(th).find('.img-navs .nav-itm:nth-child(2)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(2)').addClass('active-img')
            }
        }
        if (childCount == "3") {
            if (pos == 0) {
                $(th).find('.img-navs .nav-itm:nth-child(1)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(1)').addClass('active-img')
            }
            if (pos == 33) {
                $(th).find('.img-navs .nav-itm:nth-child(2)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(2)').addClass('active-img')
            }
            if (pos == 66) {
                $(th).find('.img-navs .nav-itm:nth-child(3)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(3)').addClass('active-img')
            }
            if (pos == 99) {
                $(th).find('.img-navs .nav-itm:nth-child(3)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(3)').addClass('active-img')
            }
        }
        if (childCount == "4") {
            if (pos == 0) {
                $(th).find('.img-navs .nav-itm:nth-child(1)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(1)').addClass('active-img')
            }
            if (pos == 25) {
                $(th).find('.img-navs .nav-itm:nth-child(2)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(2)').addClass('active-img')

            }
            if (pos == 50) {
                $(th).find('.img-navs .nav-itm:nth-child(3)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(3)').addClass('active-img')

            }
            if (pos == 75) {
                $(th).find('.img-navs .nav-itm:nth-child(4)').addClass('nav-itm-active')
                $(th).find('.img-list img:nth-child(4)').addClass('active-img')

            }
        }

        prevPercent = pos;
    };

}


if (document.querySelector('.products-slider')) {
    /*    console.log('s')
        if(screen.width > 576) {
            $('.products-slider').each(function () {
                console.log($(this));
                if ($(this).find('.products-container .item').length > 4) {
                    $(this).find('.products-container').slick({
                        slidesToShow: 4,
                        arrows: true,
                        slidesToScroll: 4,
                        infinite: false,
                        responsive: [
                            {
                                breakpoint: 1366,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 1230,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            },
                            {
                                breakpoint: 1180,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            },
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                        ]
                    });
                }
            })
        }
    */
}

if (document.querySelector('.beneficial-offers-slider')) {
    $('.beneficial-offers-slider').slick({
        slidesToShow: 4,
        arrows: true,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
if (document.querySelector('.banner-slider-pc')) {
    $('.banner-slider-pc').slick({
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    dots: false,
                    arrows: false
                }
            }]
    });
}
if (document.querySelector('.banner-slider-mobile')) {
    $('.banner-slider-mobile').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        lazyLoad: 'ondemand',
    });
}
if (document.querySelector('.catalog-slider')) {
    $('.catalog-slider .list-c').slick({

        slidesToShow: 5,

        arrows: true,

        slidesToScroll: 5,

        dots: true,

        responsive: [

            {

                breakpoint: 1650,

                settings: {

                    slidesToShow: 5,

                    slidesToScroll: 5

                }

            },

            {

                breakpoint: 1366,

                settings: {

                    slidesToShow: 4,

                    slidesToScroll: 4

                }

            }, {

                breakpoint: 1230,

                settings: {

                    slidesToShow: 4,

                    slidesToScroll: 4

                }

            },

            {

                breakpoint: 1180,

                settings: {

                    slidesToShow: 3,

                    slidesToScroll: 3

                }

            },

            {

                breakpoint: 840,

                settings: {

                    slidesToShow: 2,
                    arrows: false,

                    slidesToScroll: 2

                }

            },

            {

                breakpoint: 340,

                settings: {

                    slidesToShow: 1,

                    slidesToScroll: 1,

                }

            }

        ]

    })

}

if (document.querySelector('.main-slide-div')) {
    $('.main-slide-div').slick({
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false
                }
            },
        ]
    });
}

//sliders end


//counter in product item
{
    $(document).on('click', '.minus', function (e) {
        if (!isAvailableProductItem(e)) return;
        counteReduce(e);
        e.preventDefault()
    });

    $(document).on('click', '.plus', function (e) {
        if (!isAvailableProductItem(e)) return;
        counterIncrease(e);
        e.preventDefault()
    });

    function initProductCounterCheck() {
        $('.counter input').unbind()
        let counter = $(".counter input");
        counter.on('change paste', function (e) {
            console.log("change");
            let text = e.target.value;
            let testText = text;
            let step = +e.target.dataset.step || 1;
            let correctNumber;
            if (e.target.value.length == 0) {
                e.target.value = 1;
            }
        });
        $('.counter input').keyup(function (e) {
            console.log("s");
            let text = e.target.value;
            let testText = text;
            let step = +e.target.dataset.step || 1;
            let correctNumber;
            if (testText * 1 + 0 != text) {
                correctNumber = testText.substring(0, testText.length - 1)
                if (isNaN(correctNumber)) {
                    correctNumber = step;
                }
                e.target.value = correctNumber;

            }
            //change font if 100+
            if (+e.target.value > 99) {
                e.target.classList.add('small')
            } else {
                if (e.target.classList.contains('small')) {
                    e.target.classList.remove('small')
                }
            }
        });


    }

    function reinitCounterCheck() {
        initProductCounterCheck()
    }

    if ($('.counter input').length) {
        initProductCounterCheck()
    }
//counter in  product item. checl input with correct step
    $('.counter input').change(function (e) {
        let step = +e.target.dataset.step || 1;
        e.target.value = round(e.target.value, step)
    })


    function round(number, step) {
        let num = Math.ceil(number / step) * step;
        if (num == 0) {
            num = step
        }
        return num;
    }

    function checkCounterValue(e) {
    }

    function counterIncrease(e) {
        e.preventDefault()
        let input = e.target.parentNode.querySelector('input');
        let step = +input.dataset.step || 1;
        input.value = +input.value + step;
        if (+input.value + step > 100) {
            input.classList.add('small')
        }
        input.dispatchEvent(new Event('change', {'bubbles': true}));
    }

    function checkNumber(e) {
        if ((e.which >= 48 && e.which <= 57) // цифры
            ||
            (e.which >= 96 && e.which <= 105) // num lock
            ||
            e.which == 8 // backspace
            ||
            (e.which >= 37 && e.which <= 40) // стрелки
            ||
            e.which == 46) // delete
        {
            return true;
        } else {
            return false;
        }
    }

    function counteReduce(e) {
        e.preventDefault()
        let input = e.target.parentNode.querySelector('input');
        let step = +input.dataset.step || 1;
        let value = +input.value;
        if (value > step) {
            input.value = value - step;
        }
        if (+input.value + step < 100) {
            input.classList.remove('small');
        }
        input.dispatchEvent(new Event('change', {'bubbles': true}));
    }

    function setProductsRating() {
        //
    }

    function setStarInPercent(element, percent) {
        //
    }

//counter end
}


//----------------catalog page start

// filters init
{
    if (document.querySelector('.catalog')) {
        priceSliderInit();
    }

    function priceSliderInit() {
        if (document.querySelector('.valueMin')) {
            let minValue = +document.querySelector('.valueMin').dataset.valuemin;
            let maxValue = +document.querySelector('.valueMax').dataset.valuemax;
            $("#slider-range").slider({
                range: true,
                min: minValue,
                max: maxValue,
                values: [minValue, maxValue],
                slide: function (event, ui) {
                    $("#min").val(ui.values[0])
                    $("#max").val(ui.values[1])
                    changePrice();
                }
            });
            $("#amount").val("$" + $("#slider-range").slider("values", 0) +
                " - $" + $("#slider-range").slider("values", 1));
        }
    }
}

//filters interaction
{
    $('.mobile-open-filters').click(function (e){
        showFilterBlock()
    })
    $('.close-filter-block').click(function (e){
        hideFilterBlock()
    })
    $('.f-title').click(function (e) {
        e.preventDefault()
        if (!$(this).parent().find('.content').hasClass('active')) {
            $(this).parent().find('.content').addClass('active')
            let a =  $(this).parent().find('.content label').length + 4 * 29;
            $(this).addClass('active')
            document.querySelector('.catalog-filters').style.setProperty(
                "--itmH",
                a+"px"
            )
        } else {
            $(this).parent().find('.content').removeClass('active')
            $(this).removeClass('active')

        }
    })

    function showFilterBlock() {
        $('.catalog-filters').addClass('active')
        lockBg()
    }

    function hideFilterBlock() {
        $('.catalog-filters').removeClass('active')
        unlockBg();
    }
}
//filter list top start
var filterItems = [];

/*
function isFilteredCatalog() {
    return !!($('.catalog-filters input[type=checkbox]:checked').length);
}
if (isFilteredCatalog()) {
    initFilterSelectionList()
}
function initFilterSelectionList() {
    $('.catalog-selection_block').addClass('show')
    addFilterSelectionListener()
    createFilterSelectionList()
}

function addFilterSelectionListener() {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('catalog-selection__item')) {
            let filterElem = findElemByNameInArray(event.target.dataset.name);
            //if last filter, make scroll to products
            if (filterElem) {
                $(filterElem['rel']).attr('checked', false)
                RefreshCatalogPage(false, true)
            }
        }
    });
}
function RefreshCatalogPage(){
    console.log('refresh')
}
*/

function setLocalStorageScrollTrigger() {
    localStorage.setItem('catscroll', JSON.stringify(true))
}

function removeLocalStorageScrollTrigger() {
    localStorage.removeItem('catscroll')
}

function isScrollTrigger() {
    if (localStorage.getItem('catscroll')) {
        return true;
    } else {
        return false;
    }

}

$('.clear_filters').click(function (e) {
    let allInputs = $('.catalog-filters input[type=checkbox]:checked');
    setLocalStorageScrollTrigger()
    allInputs.each(function () {
        $(this).attr('checked', false)
    })
    RefreshCatalogPage(false, true)
})


function findElemByNameInArray(name) {
    let findElem;
    filterItems.forEach(el => {
        if (el["id"] == name) {
            findElem = el;
        }
    })
    return findElem;
}
function createFilterSelectionList() {
    let allInputs = $('.catalog-filters input[type=checkbox]:checked');
    console.log(allInputs);
    allInputs.each(function () {
        let elem = $(this);
        let elemVal = elem.attr('data-filtervalue');
        let elName = elem.parent().find('.check__text').text();
        let obj = {
            "id": elemVal,
            "rel": elem,
            "name": elName
        }
        insertFilterItem(elemVal, elName)
        console.log(filterItems);
        filterItems.push(obj)
    })
}

function insertFilterItem(unicVal, name) {
    let elem = `<span class="catalog-selection__item" data-name="${unicVal}">${name}</span>`
    document.querySelector('.catalog-selection__list').insertAdjacentHTML('afterbegin', elem)
}
//filter list top end

//filter request start
{
    function makeSearchRequest(dataStr) {}

    let timeOutFilterRequest;
    /*
        function filterRequest() {
            let filterForm = document.querySelector('#turcoffee_product_filter')
            console.log(filterForm);
            for (var i = 0; i < filterForm.elements.length; i++) {
                if (filterForm.elements[i].checked) {
                    var fieldName = filterForm.elements[i].name;
                    var fieldValue = filterForm.elements[i].value;
                    //console.log(fieldName, fieldValue)

                }
            }
        }

        function sendWithTimeOut() {
            clearTimeout(timeOutFilterRequest);
            timeOutFilterRequest = setTimeout(() => {
                filterRequest();
            }, 1500)
        }

        function changePrice() {
            sendWithTimeOut();
        }

        let filtersContainer = document.querySelector('.catalog-filters');
        if (filtersContainer) {
            filtersContainer.addEventListener('click', function (e) {
                let curElement = e.target;
                if (curElement.tagName.toUpperCase() == 'INPUT') {
                    sendWithTimeOut()
                    return;
                }
            })
        }
    */

//filter end

}

//----------------catalog page end


//login popup start
if (document.querySelector('.login_popup')) {
    //mobile - in menu
    $('.menu-main-top-auth .auth-block .custom-link:first-child').click(function (e) {
        e.preventDefault()
        let popup = document.querySelector('.login_popup')

        if (popup.classList.contains('active')) {
            hideLoginPopup()
        } else {
            setTimeout(function (e) {
                showLoginPopup()
            }, 200)

        }
    })
    $('.login-event-trigger').click(function (e) {
        e.preventDefault()
        let popup = document.querySelector('.login_popup')
        if (popup.classList.contains('active')) {
            hideLoginPopup()
            console.log('h3')

        } else {
            showLoginPopup()
            console.log('h4')

        }
    })
    if (screen.width > 900) {
        $('.auth-block a:first-child').click(function (e) {
            e.preventDefault()
            let popup = document.querySelector('.login_popup')

            if (popup.classList.contains('active')) {
                hideLoginPopup()
                console.log('h5')

            } else {
                showLoginPopup()
                console.log('h6')

            }
        })
    }

}

function showLoginPopup() {
    console.log('show')

    showDarkMenuBg()
    lockBg()
    document.querySelector('.login_popup').classList.add('active')
}

function hideLoginPopup() {
    console.log('hide')

    hideDarkMenuBg()
    unlockBg()
    document.querySelector('.login_popup').classList.remove('active')
}

$('.login_popup .popup_close').click(function () {
    hideLoginErrorMsg()
})

function hideLoginErrorMsg() {
    let msg = document.querySelector('.login_popup .login-error-msg');
    if (msg)
        msg.style.display = "none";

}

//login popup end


function hidePopup() {
    $('.default_popup').removeClass('active')
}

$('.popup_close').click(function () {
    hidePopup();
    unlockBg();
    hideDarkMenuBg()
})


//cart page end


//cart popup start
function showCartPopup() {
    //
}

function hideCartPopup() {
//
}

$('.return_to_products').click(function (e) {
    e.preventDefault()
    hideCartPopup()
})
//cart popup end


if (screen.width < 900) {
    $('.lvl1 a.has_drop').click(function (e) {
        e.preventDefault()
        $(this).parent().toggleClass('active')
        $(this).parent().find('.submenu').slideToggle()
    })
    $('.toggleMenuBtn').click(function (e) {
        e.preventDefault()
        $(this).toggleClass('open')
        $('.main-menu').slideToggle();
        lockBg()
        if (!$(this).hasClass('open')) {
            $('.lvl1').removeClass('active')
            $('.submenu').slideUp()
            unlockBg()
        } else {
        }
    })
} else {
    $('.toggleMenuBtn').click(function (e) {
        e.preventDefault()
    })
}

function showSearchResultContainer() {
    $('.search-result').addClass('show')
}

function hideSearchResultContainer() {
    $('.search-result').removeClass('show')
}

function addListenerClickOutside(blockName, callback) {
    $(document).click(function (e) {
        let blockContainer = $(blockName);
        if (!blockContainer.is(e.target) && blockContainer.has(e.target).length === 0) {
            callback();
        }
    })
}


//left-menu scripts start
$('.menu-toggle').click(function (e) {
    if ($(this).hasClass('open')) {
        closeAllMenus()
    } else {
        e.preventDefault()
        showPageMenu()
        openMenuIcon()
    }
})

$('.menu-close').click(function (e) {
    e.preventDefault()
    closePageMenu()
})

function openMenuIcon() {
    $('.menu-toggle').addClass('open')
}

function closeMenuIcon() {
    $('.menu-toggle').removeClass('open')
}

function showPageMenu() {
    lockBg()
    if (screen.width > 992) {
        showDarkMenuBg()
    }
    $('.page-menu').addClass('active')
}

function closePageMenu() {
    unlockBg()
    closeMenuIcon()
    $('.page-menu').removeClass('active')
    lockBgTimer = setTimeout(function () {
        hideDarkMenuBg()
    }, 300)
}

function closeLeftCatalog() {
    $('.catalog-li').removeClass('show-menu')
    hideDarkMenuBg('catalog')
    clearMarginInsteadScrollBody()
}

// function openLeftCatalog() {
//     makeMarginInsteadScrollBody()
//     showDarkMenuBg('catalog')
//     $('.catalog-li').addClass('show-menu')
//     document.querySelector('.side-menu__bg').addEventListener('click', function (e) {
//         closeLeftCatalog()
//     })
// }

// $('.gotoCatalog').click(function (e) {
//     e.preventDefault()
//     showCatalog()
// })
$('.log-in').click(function (e) {
    e.preventDefault()
    if (screen.width < 992) {
        closePageMenu()
        clearTimeout(lockBgTimer)
        showLoginPopup()

    } else {
        showLoginPopup()

    }
})

function hideCatalog() {
    unlockBg()
    $('.header').removeClass('no-shadow')
    hideSearch()
    closeMenuIcon()
    $('.main-left').removeClass('active')

}

// function showCatalog() {
//     if (screen.width < 992) {
//         $('.header').addClass('no-shadow')
//         showSearch()
//         closePageMenu()
//         openMenuIcon()
//         lockBg()
//         $('.main-left').addClass('active')
//         $('.menu-toggle').click(function (e) {
//             hideCatalog();
//         })
//     } else {
//         closePageMenu()
//         openLeftCatalog()
//     }
// }

//left-menu scripts end


//catalog hover transition
if (false) {
    var timer2, timer3, timer4;
    document.addEventListener('DOMContentLoaded', function () {
        var
            inTriangle = false,
            navigation = document.querySelector('.main-menu'),
            x1, x2, x3, y1, y2, y3, link, timeout1, first = true, prevLink, makeN = true;

        navigation.addEventListener('mouseenter', onmouseenter);
        navigation.addEventListener('mouseleave', onmouseleave);

        function isInsideTriangle() {
            var
                b0 = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1),
                b1 = ((x2 - x0) * (y3 - y0) - (x3 - x0) * (y2 - y0)) / b0,
                b2 = ((x3 - x0) * (y1 - y0) - (x1 - x0) * (y3 - y0)) / b0,
                b3 = ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)) / b0;

            return b1 > 0 && b2 > 0 && b3 > 0;
        }

        function onmouseenter(event) {
            x0 = event.clientX;
            y0 = event.clientY;
            document.addEventListener('mousemove', onmousemove);
        }

        function onmouseleave(event) {
            document.removeEventListener('mousemove', onmousemove);
            cleadrAllSubmenuActive()
        }

        function onmousemove(event) {
            var linkNominee = event.target.closest('li.lvl1');
            x0 = event.clientX;
            y0 = event.clientY;
            if (first) {
                makeHoverMenuElement(linkNominee)
                var next = linkNominee.lastElementChild.getBoundingClientRect();
                prevLink = linkNominee;
                x1 = x0 - 50;
                y1 = y0;

                x2 = next.left + 150;
                y2 = next.top;

                x3 = next.left + 150;
                y3 = next.bottom;
                first = false;
                console.log('first')
                timer2 = setTimeout(function () {
                    x2 = 0;
                    y2 = 0;
                    x3 = 0;
                    y3 = 0;
                    first = true;
                    console.log('timer')
                }, 1000)
            }

            if (isInsideTriangle()) {
                console.log('in')
            } else {
                clearTimeout(timer2)
                //change link
                console.log('change')
                cleadrAllSubmenuActive(prevLink)
                makeHoverMenuElement(linkNominee)
                first = true;

            }


        }
    });
    $('.main-menu').addClass('js')

    function makeHoverMenuElement(el) {
        cleadrAllSubmenuActive()
        $(el).addClass('hov-transtition');
    }

    function unHoverMenuElement(el) {
        $(el).removeClass('hov-transtition');
    }


    function frs(el) {
        $('.main-menu').addClass('js')
        $(el).addClass('hov-transtition')
    }

    function cleadrAllSubmenuActive() {
        $('.hov-transtition').removeClass('hov-transtition')
    }

    function unfrs(el) {
        $('.main-menu').removeClass('js')
        $('.hov-transtition').removeClass('hov-transtition')
    }
}
if (document.querySelector('.slider')) {
    $('.slider').slick({
        arrows: true,
        dots: true
    });
}
$('.add-to-cart').click(function (e) {
    $(this).parents('.popup_content')
    if (screen.width < 576) {
        setTimeout(function () {
            const element = e.target.closest(".popup_content");
            $('.popup_content').animate({
                scrollTop: element.scrollHeight
            }, 1000);
        }, 500)

    }
})
$('.add-to-cart').click(function (e) {
    if (screen.width < 576) {
        let element = e.target.closest(".popup_content");
        $('.popup_content').animate({
            scrollTop: element.scrollHeight
        }, 1000);
    }
})


//menu hover start

if(document.querySelector('.menu-main-ul')){
    if(screen.width > 480) {
        var $menu = $(".menu-main-ul");
        $menu.menuAim({
            activate: activateSubmenu,
            deactivate: deactivateSubmenu,
            exitMenu: exitM,
            enter: enterM
        });
    }else{
        $('.has-drop a').click(function (e) {
            e.preventDefault()
            let elem = $(this).parents('.has-drop');
            toggleSubmenuMobile(elem);
        })
    }
    function exitM(){
        $('.menu-main-ul').addClass('no-hover')

    }
    function enterM(){
        $('.menu-main-ul').removeClass('no-hover')

    }
    function activateSubmenu(row) {
        $('.menu-main-ul').removeClass('no-hover')

        var $row = $(row),
            $submenu =$row.find('.level-2');
        $submenu.css({
            display: "block",
        });
        $row.find("a").addClass("maintainHover");
    }

    function deactivateSubmenu(row) {
        console.log('deact')
        var $row = $(row),
            $submenu =$row.find('.level-2');
        $submenu.css("display", "none");
        $row.find("a").removeClass("maintainHover");
    }
    $(".dropdown-menu li").click(function (e) {
        e.stopPropagation();
    });

}
$('.close-subcatalogMenu').click(function (e) {
    toggleSubmenuMobile($(e.target).parents('.has-drop'))
})
function toggleSubmenuMobile(el){
    if(  $(el).find('.level-2').hasClass('mobile-sub-open')){
        // $(el).find('.level-2').slideUp();
        $(el).removeClass('has-drop-act');
        $(el).find('.level-2').removeClass('mobile-sub-open');
    }else{
        // $('.mobile-sub-open').slideUp()
        $('.mobile-sub-open').removeClass('mobile-sub-open')
        // $(el).find('.level-2').slideDown();
        $(el).addClass('has-drop-act');
        $(el).find('.level-2').addClass('mobile-sub-open');
    }


}



// default popup start
var globalAllPopupTimeOut = [];
var globalPopupTimeOut;
let obj2 = {
    id: '',
    titleContent: '',
    bodyContent: '',
    bottomContent: '',
    displayTime: '',
    popupSize: '',
    popupClasses: '',
    callbackAfterOpen: function () {
    },
    callbackAfterClose: function () {
    },
}

function removePopup(popId) {
    console.log(popId)
    clearObjFromArray(popId, globalAllPopupTimeOut)
    $(popId + '+ .side-menu__bg_popup2').remove();
    $(popId).remove();
    if (!checkExistActivePopup()) {
        unlockBg()
    }
}

function checkExistActivePopup() {
    let actPop = $('.default_popup2.active');
    if (actPop.length > 0) {
        return true;
    }
    return false;
}

function showTempPopup(opt) {
    if (!opt.popupSize) {
        opt.popupSize = ''
    }
    if (!opt.titleContent) {
        opt.titleContent = ''
    }
    if (!opt.bodyContent) {
        opt.bodyContent = ''
    }
    if (!opt.bottomContent) {
        opt.bottomContent = ''
    }
    if (!opt.popupSize) {
        opt.popupSize = ''
    }

    let popup = createTempPopupHtml(opt);
    let popupHtml = popup[0];
    let popupId = "#" + popup[1];
    console.log(popupId)
    document.querySelector('.layout ').insertAdjacentHTML('beforeend', popupHtml);
    lockBg()
    calculatePopupHeight(popupId)
    $(popupId).addClass('active')
    if (!!opt.displayTime) {
        let timeout1 = setTimeout(function () {
            removePopup(popupId)
            if (!($('.default_popup2').hasClass('active'))) {
                unlockBg()
            }
            if (opt.callbackAfterClose) {
                opt.callbackAfterClose();
            }
        }, opt.displayTime)
        globalAllPopupTimeOut.push({
            'popup': popupId,
            'timer': timeout1
        })
    }
    if (opt.callbackAfterOpen) {
        opt.callbackAfterOpen();
    }
    $(popupId + ':not(.no-temp) + .side-menu__bg_popup2').click(function (e) {
        removePopup(popupId)
    })
    $(popupId + ':not(.no-temp)').find('.popup_close2').click(function (e) {
        removePopup(popupId)
    })
    $(popupId + ":not(.no-temp)").find('.hide_temp_popup').click(function (e) {
        removePopup(popupId)
    })
}

if (document.querySelector(".default_popup2.no-temp")) {
    $(".default_popup2.no-temp").each((id, el) => {
        let popId = $(el).attr('id');
        $("#" + popId + '+ .side-menu__bg_popup2').click(function (e) {
            hidePopup(popId)
        })
        $("#" + popId).find('.popup_close2').click(function (e) {
            hidePopup(popId)
        })
        $("#" + popId).find('.hide_temp_popup').click(function (e) {
            hidePopup(popId)
        })
    })
}

function clearObjFromArray(id, arr = []) {
    arr.forEach((el, index) => {
        if (el['popup'] == id) {
            console.log('claer')
            clearTimeout(el['timer'])
            arr.splice(index, 1);
        }
    })
}

function createTempPopupHtml(opt) {
    let counterPopup = document.querySelectorAll('.temp_popups').length;
    let popupClasses = "";
    let popId = "temp_popup" + counterPopup;
    if (!!opt.popupClasses) {
        popupClasses = opt.popupClasses.split(',').join(' ');
    }
    let zIndex1 = 42 + counterPopup;
    let zIndex2 = 41 + counterPopup;
    let htmtBlock = `
    <div class="default_popup2 temp_popups ${opt.popupSize} ${popupClasses}" id="${popId}"  style="z-index: ${zIndex1}">
    <div class="popup_close2">
        <div class="icon-close2"><span></span></div>
    </div>
    <div class="popup_body2 default-text">
        <div class="popup_title2">
        ${opt.titleContent}
     </div>
        <div class="popup_content2">
            ${opt.bodyContent}
        </div>
        <div class="popup_bottom2">
                ${opt.bottomContent}
        </div>
    </div>
</div>
<div class="side-menu__bg_popup2" style="z-index: ${zIndex2}"></div>
`
    return [htmtBlock, popId];
}

function calculatePopupHeight(popupId) {
    let titleHeight = $(popupId).find('.popup_title').height();
    let bottomHeight = $(popupId).find('.popup_bottom').height();
    let commonHeight = 145 + titleHeight + bottomHeight;
    $(popupId).find('.popup_content').css('max-height', 'calc(90vh - ' + commonHeight + 'px');
    // 85
}

function openPopup(id, content, time) {
    let popupId = '#' + id;
    if (!document.querySelector(popupId)) {
        return
    }
    if (!!content) {
        $(popupId).find('.popup_content2').html(content)
    }
    lockBg()
    showDarkMenuBg()
    calculatePopupHeight(popupId)
    $(popupId).addClass('active')
    if (!!time) {
        globalPopupTimeOut = setTimeout(function () {
            $(popupId).removeClass('active')
            unlockBg()
            hideDarkMenuBg()
        }, time)
    }

}

function openPopupObj(obj) {

    if (!obj.id) {
        return;
    }
    let popupId = '#' + obj.id;
    if (!document.querySelector(popupId)) {
        return
    }

    if (!!obj.titleContent) {
        $(popupId).find('.popup_title2').html(obj.titleContent)
    }
    if (!!obj.bodyContent) {
        $(popupId).find('.popup_content2').html(obj.bodyContent)
    }
    if (!!obj.bottomContent) {
        $(popupId).find('.popup_bottom2').html(obj.bottomContent)
    }
    if (!!obj.popupClasses) {
        let cls = obj.popupClasses.split(',')
        cls.forEach(popupClassName => {
            document.querySelector(popupId).classList.add(popupClassName);
        })
    }
    if (!!obj.popupSize) {
        switch (obj.popupSize) {
            case 'mini':
                document.querySelector(popupId).classList.add('mini');
                break;
            case  'medium':
                document.querySelector(popupId).classList.add('medium')
                break;
            case  'maxi':
                document.querySelector(popupId).classList.add('maxi')
                break;
        }
    }
    lockBg()
    showDarkMenuBg()
    calculatePopupHeight(popupId)
    $(popupId).addClass('active')
    if (!!obj.displayTime) {
        globalPopupTimeOut = setTimeout(function () {
            hidePopup()
            unlockBg()
            hideDarkMenuBg()
            if (obj.callbackAfterClose) {
                obj.callbackAfterClose();
            }
        }, obj.displayTime)
    }

}

function hidePopup(id = "") {
    if (id.length > 0) {
        $("#" + id).removeClass("active");
    } else {
        if (!!globalPopupTimeOut) {
            clearTimeout(globalPopupTimeOut)
        }

        $('.default_popup2.active').find('.popup_title2').html('')
        $('.default_popup2.active').find('.popup_content2').html('')
        $('.default_popup2.active').find('.popup_bottom2').html('')
        $('.default_popup2.active').removeClass().addClass('default_popup2');
    }
}

$('.popup_close2').click(function () {
    let id = $(this).parents(".default_popup2").attr("id");
    hidePopup(id);
    unlockBg();
})

//default popup end


function showDefaultPopup(titleText = "", textHtml = "", time = 2000) {
    showTempPopup({
        titleContent: `<p class="title">${titleText}</p>`,
        bodyContent: `<p>${textHtml}</p>`,
        popupSize: 'medium',
        displayTime: time
    })
}

function hideDefaultPopup() {
    hideDarkMenuBg()
    unlockBg()
    document.querySelector('.content_popup').classList.remove('active')

}

$('.popup_close').click(function () {
    hidePopupX();
    unlockBg();
    hideDarkMenuBg()
})

function hidePopupX() {
    $('.default_popup').removeClass('active')
}

//default popup end

$(".showallfabs").on("click", function(){
    $(".fabhide").slideToggle(function(){
    });
    $(this).fadeOut();
});
$('.chose-link a').click(function (e) {
    $('.remotenav a').removeClass('active')
    $('.remotenav a[href="#configuration"]').addClass('active')
})
$('.remotenav a').click(function (e) {
    e.preventDefault()
    $('.remotenav a').removeClass('active')
    $(this).addClass('active')
})


//cabinet
$('.history-more').click(function (e){
    e.preventDefault()
    $(this).parents(".order-history-record").toggleClass('active')
    $(this).parents(".order-history-record").find('.order-history-item-details').slideToggle()
})

document.querySelectorAll('.form .form-row').forEach(el => {
    if (!el.querySelector('input')) {
        if (el.querySelector('select')) {
            el.querySelector('select').addEventListener('focus', function (e) {
                e.target.parentElement.classList.remove('error')
                e.target.parentElement.classList.add('active')
                e.target.removeAttribute('aria-invalid');
            })
        }
        if (el.querySelector('.textarea')) {
            el.querySelector('.textarea').addEventListener('focus', function (e) {
                e.target.parentElement.classList.remove('error')
                e.target.removeAttribute('aria-invalid');

            })
        }
        return

    }

    el.querySelector('input').addEventListener('focus', function (e) {
        e.target.parentElement.classList.add('active')
        e.target.parentElement.classList.remove('error')
        e.target.removeAttribute('aria-invalid');

    })
    el.querySelector('input').addEventListener('blur', function (e) {
        if (e.target.value == 0) {
            e.target.parentElement.classList.remove('active')
        }
    })
})

$('.page-menu-container + .side-menu__bg_popup2').click(function (e){
    closePageMenu()
})
function closePageMenu(){
    $('.page-menu-container').removeClass('active')

}
$('.close-page-menu').click(function (e){
    closePageMenu()
})
$('.open-page-menu').click(function (e){
    hideCatalogMenu()
    hideCart()
    $('.page-menu-container').addClass('active')
})


if(document.querySelector('.form-row')){
            document.querySelectorAll('.form-row').forEach(el => {
            if (!el.querySelector('input')) {
                if (el.querySelector('select')) {
                    el.querySelector('select').addEventListener('focus', function (e) {
                        e.target.parentElement.classList.remove('error')
                        e.target.removeAttribute('aria-invalid');
                    })
                }
                if(el.querySelector('textarea')) {
                    el.querySelector('textarea').addEventListener('focus', function (e) {
                        e.target.parentElement.classList.add('active')
                        e.target.parentElement.classList.remove('error')
                        e.target.removeAttribute('aria-invalid');
                    })
                    el.querySelector('textarea').addEventListener('blur', function (e) {
                        if (e.target.value == 0) {
                            e.target.parentElement.classList.remove('active')
                        }
                    })
                }
                return
            }
            if(el.querySelector('input')) {
                el.querySelector('input').addEventListener('focus', function (e) {
                    e.target.parentElement.classList.add('active')
                    e.target.parentElement.classList.remove('error')
                    e.target.removeAttribute('aria-invalid');

                })
            }

            el.querySelector('input').addEventListener('blur', function (e) {
                             if (e.target.value == 0) {
                    e.target.parentElement.classList.remove('active')
                }
            })
        })
}


