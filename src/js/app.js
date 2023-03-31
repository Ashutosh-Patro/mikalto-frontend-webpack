import '../scss/app.scss';

/* Your JS Code goes here */

const crossIcon = document.querySelector('#cross-button')
const dropDown = document.querySelector('#dropdown-button')
const navBar = document.querySelector('#nav-list')
const navLeft = document.querySelector('#nav-item-list-left')
const navRight = document.querySelector('#nav-item-list-right')
const experienceItem = document.querySelectorAll('#experience-items div')
const reviewItem = document.querySelectorAll('#review-items .review-item-div')
const activityData = document.querySelector('#activities')
const reconnectNature = document.querySelector('#reconnect-nature')
const banner = document.querySelector('#banner')
const submitBtn = document.querySelector('.submit')
const carouselRoomDetails = document.querySelectorAll('.carousel-rooms div')

function dropdown() {
    crossIcon.classList.toggle('hidden')
    dropDown.classList.toggle('hidden')
    navLeft.classList.toggle('hidden')
    navRight.classList.toggle('hidden')
    navBar.style.background = 'rgba(0,0,0,0.8)'
}

function removeDropdown() {
    dropDown.classList.toggle('hidden')
    crossIcon.classList.toggle('hidden')
    navLeft.classList.toggle('hidden')
    navRight.classList.toggle('hidden')
    navBar.style.background = ('none')
    navBar.style.opacity = '1'
}

function next() {
    document.querySelector('.dulex-room-image').classList.toggle('hidden')
    document.querySelector('.standard-room-image').classList.toggle('hidden')
    document.querySelector('.standard-room-details').classList.toggle('hidden')
    document.querySelector('.dulex-room-details').classList.toggle('hidden')
}

function previous() {
    document.querySelector('.dulex-room-image').classList.toggle('hidden')
    document.querySelector('.standard-room-image').classList.toggle('hidden')
    document.querySelector('.standard-room-details').classList.toggle('hidden')
    document.querySelector('.dulex-room-details').classList.toggle('hidden')
}

async function fetchCards() {
    await fetch('http://localhost:8081/experience').then((data) => {
        return data.json();
    }).then((res) => {
        experienceItem.forEach((item, index) => {
            item.querySelector('.experience-image').setAttribute('src', `${res.experienceObj[index].imageURL}`)
            item.querySelector('.sub-heading').textContent = `${res.experienceObj[index].cardSubHeading}`
            item.querySelector('.heading').textContent = `${res.experienceObj[index].cardHeading}`
            item.querySelector('.content').textContent = `${res.experienceObj[index].cardContent}`
        })
    })
}

async function fetchReviews() {
    await fetch('http://localhost:8081/reviews').then((data) => {
        return data.json();
    }).then((res) => {
        reviewItem.forEach((item, index) => {
            item.querySelector('.review-image').setAttribute('src', `${res.reviewsObj[index].profileImage}`)
            item.querySelector('.review-name').textContent = `${res.reviewsObj[index].name}`
            item.querySelector('.review-date').textContent = `${res.reviewsObj[index].date}`
            item.querySelector('.review-default-image').setAttribute('src', `${res.reviewsObj[index].profileLogo}`)
            item.querySelector('.review-heading').textContent = `${res.reviewsObj[index].reviewHead}`
            item.querySelector('.review-content').textContent = `${res.reviewsObj[index].reviewContent}`
        })
    })
}

async function fetchActivities() {
    await fetch('http://localhost:8081/activitiesNature').then((data) => {
        return data.json();
    }).then((res) => {
        activityData.querySelector('.activities-image').setAttribute('src', `${res.activitiesNatureObj[0].imageURL}`);
        activityData.querySelector('.activities-sub-heading').textContent = `${res.activitiesNatureObj[0].cardSubHeading}`;
        activityData.querySelector('.activities-heading').textContent = `${res.activitiesNatureObj[0].cardHeading}`;
        activityData.querySelector('.activities-content').textContent = `${res.activitiesNatureObj[0].cardContent}`;
    })
}

async function fetchReconnectNature() {
    await fetch('http://localhost:8081/activitiesNature').then((data) => {
        return data.json();
    }).then((res) => {
        reconnectNature.querySelector('.reconnect-nature-image').setAttribute('src', `${res.activitiesNatureObj[1].imageURL}`)
        reconnectNature.querySelector('.reconnect-nature-sub-heading').textContent = `${res.activitiesNatureObj[1].cardSubHeading}`
        reconnectNature.querySelector('.reconnect-nature-heading').textContent = `${res.activitiesNatureObj[1].cardHeading}`
        reconnectNature.querySelector('.reconnect-nature-content').textContent = `${res.activitiesNatureObj[1].cardContent}`
        for (let i = 0; i < res.activitiesNatureObj[1].list.length; i++) {
            let li = document.createElement('li')
            li.textContent = `${res.activitiesNatureObj[1].list[i]}`
            reconnectNature.querySelector('.reconnect-nature-list').appendChild(li)
        }
    })
}

async function fetchBannerData() {
    await fetch('http://localhost:8081/banner').then((data) => {
        return data.json();
    }).then((res) => {
        banner.style.backgroundImage = `url(${res.bannerObj[0].imageURL})`
        banner.querySelector('.banner-heading').textContent = `${res.bannerObj[0].bannerHeading}`
        banner.querySelector('.banner-content').textContent = `${res.bannerObj[0].bannerContent}`
    })
}

async function fetchCarouselData() {
    await fetch('http://localhost:8081/carousel').then((data) => {
        return data.json();
    }).then((res) => {
        carouselRoomDetails.forEach((item, index) => {
            item.querySelector('.room-sub-heading').textContent = `${res.carouselObj[index].subHeading}`
            item.querySelector('.room-detail').textContent = `${res.carouselObj[index].description}`
            item.querySelector('.room-rate').textContent = `${res.carouselObj[index].rate}`
            item.querySelector('.room-heading').textContent = `${res.carouselObj[index].heading}`
            item.querySelectorAll('.room-detail-content .room-specifications-bed').forEach((item) => {
                item.textContent = `${res.carouselObj[index].bed}`
            })
            item.querySelectorAll('.room-detail-content .room-specifications-people').forEach((item) => {
                item.textContent = `${res.carouselObj[index].capacity}`
            })
            item.querySelectorAll('.room-detail-content .room-specifications-area').forEach((item, i) => {
                item.textContent = `${res.carouselObj[index].roomSize}`
            })
            item.querySelectorAll('.room-detail-content .room-specifications-view').forEach((item, i) => {
                item.textContent = `${res.carouselObj[index].view}`
            })
        })
    })
}

(() => {
    fetchCards();
    fetchReviews();
    fetchActivities();
    fetchReconnectNature();
    fetchBannerData();
    fetchCarouselData();
})()

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (form.checkin.value.length > 0 && form.checkout.value.length > 0 && form.adult.value.length > 0 && form.child.value.length > 0) {
        fetch("http://localhost:8081/", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: `id=${Date.now()}&checkin=${form.checkin.value}&checkout=${form.checkout.value}&adult=${form.adult.value}&child=${form.child.value}`,
        }).then((res) => {
            // console.log(res.json());
        })
    }
    else {
        alert("Fields should not be empty")
    }

})
