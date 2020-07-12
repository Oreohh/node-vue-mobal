<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper-1.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper-2.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper-3.jpeg">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-4 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4" v-for="n in 12" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div> 
      <div class="bg-light py-3 ">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-3 fs-lg-1 d-flex" 
        v-for="(news, index) in category.newsList" :key="index">
          <span class="ex fs-sm mr-2 text-info">{{news.categoryName}}</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link 
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center" 
            v-for="(hero, index) in category.heroList" :key="index"
            style="width:20%"
          >
            <img class="w-100" :src="hero.avatar" alt="">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
    <m-card icon="vedio" title="精彩视频">

    </m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home',
          
        }
      },
      newsCats: [],
      heroCats: []
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right:1px solid $border-color ;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
.ex {
  border: 1px solid map-get($colors, 'info');
  padding: 0.0769rem;
  border-radius: 0.2308rem;
}
</style>
