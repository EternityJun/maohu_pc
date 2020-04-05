<template>
  <div class="bd-map-wrap">
    <baidu-map
      class="bd-map-view"
      :ak="ak"
      :center="center"
      :scroll-wheel-zoom="true"
      :zoom="zoom"
      @ready="ready"
      @click="click"
    >
      <bm-marker :position="tipCenter"></bm-marker>
    </baidu-map>

    <!-- <img v-show="isReadied" :src="require('@/assets/location-64x64.png')" class="center-tip"/> -->

    <div v-show="isReadied" class="search-box">
      
        <div class="search-input-wrap">
          <el-input
            v-model="searchWord"
            :clearable="!readOnly"
            :readonly="readOnly"
            placeholder="请输入搜索内容"
            size="medium"
            style="width: 340px"
            @input="poiSearch"
            @keyup.enter.native="readOnly ? '' : searchAreaPointByName()"
          ></el-input>
          
          <el-button-group
            v-if="!readOnly"
            class="input-btn-group"
            slot="append"
          >
            <el-button size="medium" type="primary">搜索</el-button>
          </el-button-group>
        </div>
        
        <div ref="poiList" class="poi-list"></div>
    </div>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {
  BmMarker 
} from 'vue-baidu-map'
import { Promise, resolve, reject } from 'q';

export default {
  name: 'baiduMap',
  components: {
    'baidu-map': BaiduMap,
    'bm-marker': BmMarker,
  },
  props: {
    initArea: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 地图参数
      ak: 'OVXykpuYd0CgxZafxrQlUYxMVy1gjSfF',
      map: null, // 实例
      BMap: null,
      BMapGeo: null,
      BMapLoac: null,
      center: {
        lng: 0,
        lat: 0,
      },
      zoom: 1,
      // 操作内容
      // 当前位置信息
      current: {},
      tipCenter: {},
      isReadied: false,
      localCityInfo: JSON.parse(localStorage.getItem('local_city_info')),
      searchWord: '',
      searchList: [],
      mapAnimateTimer: null,
      poiSearchTimer: null,
    };
  },
  watch: {
    initArea(newVal) {
      this.searchAreaPointByName(newVal);
    },
  },
  methods: {
    animateMap({
      lngStart,
      lngEnd,
      latStart,
      latEnd,
      lngSpeed = (lngEnd - lngStart) / 30,
      latSpeed = (latEnd - latStart) / 30,
    }) {
      clearTimeout(this.mapAnimateTimer);
      const currentLng = Math[lngStart > lngEnd ? 'max' : 'min'](lngStart + lngSpeed, lngEnd);
      const currentLat = Math[latStart > latEnd ? 'max' : 'min'](latStart + latSpeed, latEnd);
      this.center = {
        lng: currentLng,
        lat: currentLat,
      };
      const self = this;
      if (currentLat !== lngEnd && currentLat !== latEnd) {
        this.mapAnimateTimer = setTimeout(function moveMap() {
          self.animateMap({
              lngStart: currentLng,
              lngEnd,
              latStart: currentLat,
              latEnd,
              lngSpeed,
              latSpeed,
          })
        }, 16.7)
      }
    },
    async ready({BMap, map}) {
      this.map = map
      this.BMap = BMap;
      this.BMapGeo = new BMap.Geocoder();
      this.BMapLoac = new BMap.LocalSearch(map, {      
          renderOptions:{
            map: map,
            panel: this.$refs.poiList,
            selectFirstResult: false,
          },
          onInfoHtmlSet: (marker) => {
            this.current = marker;
            this.center = marker.point;
            this.searchWord = marker.address;
            this.$emit('current', marker);
          },
      });
      if (this.localCityInfo && this.localCityInfo.name) {
        this.center = this.localCityInfo.center;
      } else {
        await this.getCurrentLocation();
      }
      this.zoom = 15;
      this.isReadied = true;
      this.searchAreaPointByName(this.initArea);
    },
    click({type, target, pixel, point}) {
      if (!this.isReadied || this.readOnly) return;
      const center = this.map.getCenter();
      this.tipCenter = point;
      this.animateMap({
        lngStart: center.lng,
        lngEnd: point.lng,
        latStart: center.lat,
        latEnd: point.lat,
      })
      this.searchAreaNameByPoint(point);
    },
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        var nowCity = new this.BMap.LocalCity();
        nowCity.get((res) => {
          this.center = res.center;
          this.tipCenter = res.center;
          this.localCityInfo = res;
          localStorage.setItem('local_city_info', JSON.stringify(res));
          resolve(res);
        });
      })
    },
    poiSearch(word) {
      if (this.poiSearchTimer || this.readOnly) return;
      this.isShowCenterTip = false;
      this.BMapLoac.search(word)
      this.poiSearchTimer = setTimeout(() => {
        clearTimeout(this.poiSearchTimer);
        this.poiSearchTimer = null;
      }, 300)
    },
    // 通过坐标 搜索当前位置的地名
    searchAreaNameByPoint(point) {
      if (!this.isReadied) return;
      this.BMapGeo.getLocation(
        new this.BMap.Point(point.lng, point.lat),
        (res) => {
          if (res){
            this.searchWord = res.address;
            this.current = res;
            this.$emit('current', res);
          }
        },
      );
    },
    // 通过地址 搜索当前位置的经纬度
    searchAreaPointByName(word = this.searchWord) {
      if (!this.isReadied) return;
      if (!word) return;
      this.BMapGeo.getPoint(
        word,
        (point) => {
          if (point) {
            this.map.centerAndZoom(point, this.zoom);
            this.tipCenter = point;
            if (this.readOnly) {
              this.searchWord = this.initArea;
              return;
            };
            this.searchAreaNameByPoint(point);
          }
        },
        this.localCityInfo.name,
      );
    },
  },
};
</script>

<style lang="less" scoped>
.bd-map-wrap {
  position: relative;
  width: 100%;
  height: 400px;
}
.bd-map-view {
  width: 100%;
  height: 100%;
}
// .center-tip {
//   position: absolute;
//   left: 50%;
//   top: 47%;
//   transform: translate3d(-50%, -50%, 0);
//   width: 30px;
//   height: 30px;
// }
.search-box {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 418px;
  max-height: 90%;
}
.search-input-wrap {
  display: flex;
}
.input-btn-group {
  display: flex;
  margin-left: 8px;
}
.poi-list {
  box-sizing: border-box;
  margin-top: 1px;
  width: 340px;
  max-height: 80%;
  overflow-x: hidden;
  background: #fff;
}
</style>
