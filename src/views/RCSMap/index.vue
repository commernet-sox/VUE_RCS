<template>
  <div class="rcsmap-container">
    <div class="rcsmap-header">
      <div
        class="tab"
        v-for="item in positionList"
        :key="item.index"
        :class="item.index == selectTabIndex ? 'tabSelect' : 'tabUnselect'"
        @click="tabChange(item)"
      >
        <div class="icon-item">
          <i class="el-icon-map-location" />
        </div>
        <p class="font">{{ item.name }}</p>
      </div>
    </div>
    <div class="rcsmap-main">
      <div class="warning mapInfo">{{ mapInfo }}</div>
      <div
        id="div1"
        class="box"
        @mousewheel="scaleDom"
        @mousemove="handleDragMove"
        @mousedown="handleDragDown"
        @mouseup="handleDragUp"
      >
        <canvas id="scaleDragCanvas" width="1920" height="1080"></canvas>
        <canvas id="carCanvas" width="1920" height="1080"></canvas>
        <!-- <p v-for="item in imgList" :key="item.key"> {{item.text}}</p> -->
        <img
          src="../../assets/sku.png"
          class="icon"
          alt=""
          @mouseover="IconOver(item)"
          @mouseout="IconOut()"
          v-for="item in imgList"
          :key="item.key"
          :style="'margin-left:' + item.x + 'px;margin-top:' + item.y + 'px;'"
        />
        <!-- <img
          src="../../assets/MyAGV.png"
          class="icon AGVicon"
          alt=""
          @mouseover="AGVIconOver(item)"
          @mouseout="AGVIconOut()"
          v-for="item in AGVCarList"
          :key="item.key"
          :style="'margin-left:' + item.x + 'px;margin-top:' + item.y + 'px;'"
        /> -->
        <div :style="'margin-left:384px;margin-top:20px;position:absolute;'">
          <el-tooltip
            class="item"
            effect="dark"
            content="Top Center 提示文字"
            placement="top"
          >
            <img src="../../assets/AGV4.png" class="carIcon" alt="" />
          </el-tooltip>
          <span class="pulse delay-01"></span>
          <span class="pulse delay-02"></span>
        </div>
      </div>
    </div>
    <div class="rcsmap-right">
      <div
        class="menutab"
        v-for="item in menuList"
        :key="item.index"
        :class="item.index == selectMenuIndex ? 'tabSelect' : 'tabUnselect'"
        @click="menuChange(item)"
      >
        <div class="icon-item">
          <i class="el-icon-map-location" />
        </div>
        <p class="font">{{ item.name }}</p>
      </div>
    </div>
    <div id="menu0" v-show="menu0" class="right-menu">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="设备信息" name="first" class="tabcolor">
          <el-row>
            <el-select
              v-model="value"
              clearable
              placeholder="请选择设备编号"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" plain size="small"
              >查询</el-button
            >
          </el-row>
          <el-row v-for="item in carList" :key="item.index">
            <el-row class="car-header">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="追踪"></el-checkbox>
                <el-checkbox label="隐匿"></el-checkbox>
              </el-checkbox-group>
            </el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple textCenter">
                <img :src="carPng" alt="" srcset="" />
                <p class="textCenter">电量</p>
                <p class="textColor">55.000%</p>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple-light">
                <el-row :gutter="10" class="row-bg">
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText">设备编号 1</label>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText">IP 192.168.0.1</label>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText">设备类型 潜伏</label>
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="10" class="row-bg">
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText">所在地图 1</label>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText">所在楼层 7</label>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText"
                        >是否在线 <span class="normal">在线</span></label
                      >
                    </div></el-col
                  >
                </el-row>
                <el-row :gutter="10" class="row-bg">
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText"
                        >任务状态 <span class="warning">运行中</span></label
                      >
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText"
                        >设备状态 <span class="warning">运行中</span></label
                      >
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div class="grid-content bg-purple">
                      <label for="" class="labelText"
                        >负载情况 <span class="normal">空载</span></label
                      >
                    </div></el-col
                  >
                </el-row>
                <el-row class="row-bg"
                  ><label for="" class="labelText"
                    >当前坐标角度 [45.200,14.160,90]</label
                  ></el-row
                >
                <el-row class="row-bg"
                  ><label for="" class="labelText"
                    >目的坐标角度 [45.200,14.160,1000]</label
                  ></el-row
                >
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="货架信息" name="second" class="tabcolor"
          >配置管理</el-tab-pane
        >
      </el-tabs>
    </div>
    <div id="menu1" v-show="menu1" class="right-menu">控制调度</div>
    <div id="menu2" v-show="menu2" class="right-menu">屏幕录制</div>
    <div id="menu3" v-show="menu3" class="right-menu">辅助工具</div>
  </div>
</template>

<script>
import { Move, GetJson } from "@/api/rcsmap";
import json from "@/assets/RCSDIV.json";
import {
  get,
  drawAgvMap,
  arcImg,
  watermark,
  removeWatermark,
} from "@/views/RCSMap/rcs.js";
export default {
  name: "RCSMap",
  data() {
    return {
      //定义对象
      canvas: null,
      context: null,
      canvas1: null,
      ctx: null,
      oDiv: null, //div1对象
      icon: null, //图标
      speed: 0,
      space: 0,
      step: 0,
      i: 0,
      finish: true,
      ws: null,
      Position: { X: 0, Y: 0 }, //agv当前坐标
      returnData: {
        AgvId: 0,
        Type: "",
        Arrived: true,
        Position: { X: 0, Y: 0 },
        Move: [],
      },
      mouseMove: false,
      imgHtml: "",
      imgList: [],
      scale: 1,
      flowData: null,
      AGVCarList: [{}],
      car1: {
        x: 0,
        y: 0,
        color: "black",
        Arrived: true,
        path: [],
        i: 0, //当前路径index
        control: {
          start: {
            x: 0,
            y: 0,
            floor: 1,
          },
          end: {
            x: 18,
            y: 19,
            floor: 1,
          },
          agvId: 1,
        },
      },
      car2: {
        x: 0,
        y: 0,
        color: "red",
        Arrived: true,
        path: [],
        i: 0,
        control: {
          start: {
            x: 1,
            y: 0,
            floor: 1,
          },
          end: {
            x: 19,
            y: 19,
            floor: 1,
          },
          agvId: 2,
        },
      },
      car3: {
        x: 0,
        y: 0,
        color: "yellow",
        Arrived: true,
        path: [],
        i: 0,
        control: {
          start: {
            x: 2,
            y: 0,
            floor: 1,
          },
          end: {
            x: 25,
            y: 19,
            floor: 1,
          },
          agvId: 3,
        },
      },
      car4: {
        x: 0,
        y: 0,
        color: "pink",
        Arrived: true,
        path: [],
        i: 0,
        control: {
          start: {
            x: 3,
            y: 0,
            floor: 1,
          },
          end: {
            x: 26,
            y: 19,
            floor: 1,
          },
          agvId: 4,
        },
      },
      editableTabsValue: "2",
      positionList: [
        {
          title: "Tab 1",
          name: "1-1 haining",
          content: "Tab 1 content",
          index: 0,
        },
        {
          title: "Tab 2",
          name: "1-2 haining",
          content: "Tab 2 content",
          index: 1,
        },
        {
          title: "Tab 2",
          name: "1-3 haining",
          content: "Tab 2 content",
          index: 2,
        },
        {
          title: "Tab 2",
          name: "1-4 haining",
          content: "Tab 2 content",
          index: 3,
        },
        {
          title: "Tab 2",
          name: "1-5 haining",
          content: "Tab 2 content",
          index: 4,
        },
        {
          title: "Tab 2",
          name: "1-6 haining",
          content: "Tab 2 content",
          index: 5,
        },
        {
          title: "Tab 2",
          name: "1-7 haining",
          content: "Tab 2 content",
          index: 6,
        },
        {
          title: "Tab 2",
          name: "1-8 haining",
          content: "Tab 2 content",
          index: 7,
        },
        {
          title: "Tab 2",
          name: "1-9 haining",
          content: "Tab 2 content",
          index: 8,
        },
        {
          title: "Tab 2",
          name: "1-10 haining",
          content: "Tab 2 content",
          index: 9,
        },
        {
          title: "Tab 2",
          name: "1-11 haining",
          content: "Tab 2 content",
          index: 10,
        },
        {
          title: "Tab 2",
          name: "1-12 haining",
          content: "Tab 2 content",
          index: 11,
        },
        {
          title: "Tab 2",
          name: "1-13 haining",
          content: "Tab 2 content",
          index: 12,
        },
        {
          title: "Tab 2",
          name: "1-14 haining",
          content: "Tab 2 content",
          index: 13,
        },
        {
          title: "Tab 2",
          name: "1-15 haining",
          content: "Tab 2 content",
          index: 14,
        },
        {
          title: "Tab 2",
          name: "1-16 haining",
          content: "Tab 2 content",
          index: 15,
        },
        {
          title: "Tab 2",
          name: "1-17 haining",
          content: "Tab 2 content",
          index: 16,
        },
      ],
      selectTabIndex: 0,
      menuList: [
        {
          title: "Tab 1",
          name: "信息监视",
          content: "Tab 1 content",
          index: 0,
        },
        {
          title: "Tab 1",
          name: "控制调度",
          content: "Tab 1 content",
          index: 1,
        },
        {
          title: "Tab 1",
          name: "屏幕录制",
          content: "Tab 1 content",
          index: 2,
        },
        {
          title: "Tab 1",
          name: "辅助工具",
          content: "Tab 1 content",
          index: 3,
        },
      ],
      selectMenuIndex: 0,
      activeName: "first",
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
      ],
      value: "",
      carPng: require("../../assets/car.png"),
      carList: [
        {
          index: 0,
          name: "agv000",
        },
        {
          index: 1,
          name: "agv001",
        },
        {
          index: 2,
          name: "agv002",
        },
      ],
      checkList: [],
      menu0: true,
      menu1: false,
      menu2: false,
      menu3: false,
      mapInfo: "地图大小(30,20)",
    };
  },
  //dom初始化后调用
  created() {},
  //dom初始化后调用
  mounted() {
    //获取json
    console.log(json);
    this.flowData = json;
    get("1", "2", "3");

    this.initCanvas();
    //画小车
    this.initCar();
    this.drawCar();
    //加水印
    removeWatermark();
    watermark(
      "第" + (this.selectTabIndex + 1) + "层",
      document.getElementById("div1")
    );

    //this.webSocket();
    // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.initCanvas();
    };
  },
  //数据改变
  watch: {},
  methods: {
    initCanvas() {
      var _this = this;
      console.log("初始化canvas");
      this.canvas = document.getElementById("scaleDragCanvas"); //画布对象
      this.context = this.canvas.getContext("2d"); //画布显示二维图片

      this.canvas1 = document.getElementById("carCanvas"); //小车对象
      this.ctx = this.canvas1.getContext("2d"); //画布显示二维图片

      this.oDiv = document.getElementById("div1");

      // canvas.width = window.innerWidth
      // canvas.height = window.innerHeight
      this.space = drawAgvMap(this.context, this.canvas, this.flowData);

      this.step = this.space / 10;
      console.log(this.space, this.step);

      this.addIcon();
    },
    //div缩放
    scaleDom: function (e) {
      let div = document.getElementById("div1");
      let scale = parseFloat(
        (div.style.transform || `scale(1)`).replace(/[^0-9.]/gi, "")
      );
      let size = e.wheelDelta / 1200;
      scale += size;
      if (scale >= 0.5) div.style.transform = `scale(${scale})`;
    },
    //鼠标移动
    handleDragMove(e) {
      if (this.mouseMove) {
        //console.log("myMove...", this.oDiv);
        e = e || window.event;
        var top = e.clientY;
        var left = e.clientX;

        var h = this.oDiv.offsetHeight;
        var w = this.oDiv.offsetWidth;

        this.oDiv.style.top = top - h / 2 + "px";
        this.oDiv.style.left = left - w / 2 + "px";
      }
    },
    //鼠标按下
    handleDragDown(e) {
      this.mouseMove = true;
    },
    //鼠标松开
    handleDragUp(e) {
      this.mouseMove = false;
    },
    //图标
    addIcon() {
      var _this = this;
      _this.imgList = [];
      _this.flowData.forEach(function (row) {
        for (var i = 0; i < row.data.length; i++) {
          if (row.data[i].show == undefined || row.data[i].show == true) {
            _this.imgList.push(row.data[i]);
            // _this.imgHtml+="<img src='../../assets/sku.png' class='icon' style='margin-left:"+row.data[i].x+"px;margin-top:"+row.data[i].y+"px;'>";
            // $('#div1').append("<img src='./sku.png' class='icon' style='margin-left:"+row.data[i].x+"px;margin-top:"+row.data[i].y+"px;'>");
          }
        }
      });
      //console.log(_this.imgList);
    },

    initCar() {
      var _this = this;
      for (let i = 0; i < 4; i++) {
        eval("_this.car" + (i + 1)).x = _this.flowData[0].data[i].x;
        eval("_this.car" + (i + 1)).y = _this.flowData[0].data[i].y;
      }
    },
    drawCar() {
      var _this = this;
      for (let i = 0; i < 4; i++) {
        _this.ctx.fillStyle = eval("_this.car" + (i + 1)).color;
        arcImg(
          _this.ctx,
          eval("_this.car" + (i + 1)).x,
          eval("_this.car" + (i + 1)).y
        );
      }
    },
    webSocket() {
      var _this = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持WebSocket");
        _this.ws = new WebSocket("ws://10.27.1.28:12580/ws"); //创建WebSocket连接
        //ws = new WebSocket("ws://10.27.9.187:5000/ws");
        //申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
        _this.ws.onopen = function () {
          //当WebSocket创建成功时，触发onopen事件
          console.log("open");
          //重置小车位置
          _this.returnData.Type = "Reset";
          _this.ws.send(JSON.stringify(_this.returnData));
          //ws.send("hello"); //将消息发送到服务端
        };
        _this.ws.onmessage = function (e) {
          //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
          //console.log(e);
          //console.log("接受: " + e.data,_this.returnData);
          var data = JSON.parse(e.data);
          if (data.Type == "GetPosition") {
            if (eval("_this.car" + data.AgvId).Arrived) {
              _this.returnData.AgvId = data.AgvId;
              _this.returnData.Type = "GetPosition";
              _this.returnData.Arrived = true;
              _this.returnData.Position.X = eval(
                "_this.car" + data.AgvId
              ).control.start.x;
              _this.returnData.Position.Y = eval(
                "_this.car" + data.AgvId
              ).control.start.y;
              _this.returnData.Move = [];
              _this.ws.send(JSON.stringify(_this.returnData));
              console.log("发送：" + JSON.stringify(_this.returnData));
            } else {
              _this.returnData.AgvId = data.AgvId;
              _this.returnData.Type = "GetPosition";
              _this.returnData.Arrived = false;
              _this.returnData.Position.X = eval(
                "_this.car" + data.AgvId
              ).control.start.x;
              _this.returnData.Position.Y = eval(
                "_this.car" + data.AgvId
              ).control.start.y;
              _this.returnData.Move = [];
              _this.ws.send(JSON.stringify(_this.returnData));
              console.log("发送：" + JSON.stringify(_this.returnData));
            }
          }
          if (data.Type == "MoveAgv") {
            console.log("移动: " + e.data);
            var path = data.Move;
            eval("_this.car" + data.AgvId).path = path;
            eval("_this.car" + data.AgvId).Arrived = false;
            _this.$options.methods.move(eval("_this.car" + data.AgvId), _this);
          }
          //ws.send("收到..");
        };
        _this.ws.onclose = function (e) {
          //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
          console.log("close");
        };
        _this.ws.onerror = function (e) {
          //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
          console.log(e);
        };
      } else {
        console.log("您的浏览器不支持WebSocket");
      }
    },
    //调用小车
    move(car, _this) {
      //var _this=this;
      if (car.i == car.path.length) {
        //结束
        console.log("agv:" + car.control.agvId + "移动结束");
        car.i = 0;
        car.Arrived = true;
      } else {
        var element = car.path[car.i];
        car.i++;
        switch (element) {
          case "up":
            _this.$options.methods.up(car, _this);

            break;
          case "down":
            _this.$options.methods.down(car, _this);

            break;
          case "left":
            _this.$options.methods.left(car, _this);

            break;
          case "right":
            _this.$options.methods.right(car, _this);

            break;
        }
      }
    },
    //小车移动
    up(car, _this) {
      //var _this = this;
      //console.log('上')
      var i = 0;
      var id = setInterval(() => {
        i += _this.step;
        if (i <= _this.space) {
          _this.$options.methods.run(_this.ctx, "up", car, _this);
        } else {
          //console.log('up...')
          car.control.start.y -= 1;

          clearInterval(id);
          _this.$options.methods.move(car, _this);
        }
      }, 100);
    },
    down(car, _this) {
      //var _this = this;
      //console.log('下')
      var i = 0;
      var id = setInterval(() => {
        i += _this.step;
        if (i <= _this.space) {
          _this.$options.methods.run(_this.ctx, "down", car, _this);
        } else {
          //console.log('down...')
          car.control.start.y += 1;

          clearInterval(id);
          _this.$options.methods.move(car, _this);
        }
      }, 100);
    },
    left(car, _this) {
      //var _this = this;
      //console.log('左')
      var i = 0;
      var id = setInterval(() => {
        i += _this.step;
        if (i <= _this.space) {
          _this.$options.methods.run(_this.ctx, "left", car, _this);
        } else {
          //console.log('left...')
          car.control.start.x -= 1;

          clearInterval(id);
          _this.$options.methods.move(car, _this);
        }
      }, 100);
    },
    right(car, _this) {
      //var _this = this;
      //console.log('右')
      var i = 0;
      var id = setInterval(() => {
        i += _this.step;
        if (i <= _this.space) {
          _this.$options.methods.run(_this.ctx, "right", car, _this);
        } else {
          //console.log('right...')
          car.control.start.x += 1;

          clearInterval(id);
          _this.$options.methods.move(car, _this);
        }
      }, 100);
    },
    run(ctx, position, car, _this) {
      //var _this = this;
      //console.log(car.x, car.y)
      ctx.clearRect(car.x - 15, car.y - 15, 40, 40);
      switch (position) {
        case "up":
          _this.speed = -_this.step;
          car.y += _this.speed;
          break;
        case "down":
          _this.speed = _this.step;
          car.y += _this.speed;
          break;
        case "left":
          _this.speed = -_this.step;
          car.x += _this.speed;
          break;
        case "right":
          _this.speed = _this.step;
          car.x += _this.speed;
          break;
      }

      ctx.beginPath();
      ctx.fillStyle = car.color;
      //ctx.fillRect(car.x, car.y, 6, 6);
      arcImg(ctx, car.x, car.y);
      ctx.closePath();
      ctx.fill();
    },
    //切换楼层
    tabChange(item) {
      var _this = this;
      console.log(this, item);
      _this.selectTabIndex = item.index;
      removeWatermark();
      watermark(
        "第" + (this.selectTabIndex + 1) + "层",
        document.getElementById("div1")
      );
      //切换楼层地图
    },
    //切换右侧菜单
    menuChange(item) {
      var _this = this;
      console.log(this, item);
      _this.selectMenuIndex = item.index;
      console.log(
        eval("_this.menu" + item.index),
        _this[`${"menu" + item.index}`]
      );
      if (_this[`${"menu" + item.index}`] == true) {
        _this[`${"menu" + item.index}`] = false;
      } else {
        _this.menuList.forEach((element) => {
          if (element.index == item.index) {
            _this[`${"menu" + item.index}`] = true;
          } else {
            _this[`${"menu" + element.index}`] = false;
          }
        });
      }
      //切换楼层地图
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    IconOver(item) {
      this.mapInfo += "  位置：" + item.x + "," + item.y;
    },
    IconOut() {
      this.mapInfo = "地图大小(30,20)";
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 1920px;
  height: 1080px;
  float: left;
  transform: scale(1);
  top: 0px;
  left: 0px;
  position: absolute;
}

#scaleDragCanvas {
  height: auto;
  background-color: #d5e6e9;
  position: absolute;
}

.tool {
  float: right;
}

#carCanvas {
  position: absolute;
  height: auto;
}

.robot,
.sku {
  border: thin solid #aaaaaa;
  height: 200px;
}
.icon {
  width: 16px;
  height: 16px;
  position: absolute;
}
.carIcon {
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 99;
}
.carIcon:hover {
  cursor: pointer;
  border: thin solid #000;
}
.icon:hover {
  cursor: pointer;
  border: thin solid #000;
}
.rcsmap-header {
  background-color: rgb(21, 32, 95);
  width: 100%;
  position: absolute;
  float: left;
  z-index: 99;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.tab {
  display: inline-block;
  padding: 0 8px;
  cursor: pointer;
}
.menutab {
  display: inline-block;
  padding: 8px 0;
  cursor: pointer;
}
.font {
  color: #ffffff;
  font-size: 5px;
}
.icon-item {
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}
.tabSelect {
  background-color: #aaaaaa;
}
.rcsmap-right {
  background-color: rgb(21, 32, 95);
  width: 50px;
  position: absolute;
  float: right;
  height: 100%;
  right: 0;
  top: 58px;
}
.right-menu {
  background-color: rgb(41, 46, 75);
  width: 400px;
  position: absolute;
  float: right;
  height: 100%;
  right: 51px;
  top: 58px;
  overflow-y: auto;
  padding: 6px;
}
.tabcolor {
  color: #ffffff;
}
.el-tabs__item {
  color: #ffffff !important;
}
.textCenter {
  text-align: center;
}
.textColor {
  text-align: center;
  color: rgb(233, 199, 49);
}
.normal {
  color: green;
}
.warning {
  color: rgb(233, 199, 49);
}
.car-header {
  background-color: rgb(7, 202, 202);
}
.labelText {
  font-size: 1px;
}
.row-bg {
  padding: 4px 0;
}
.mapInfo {
  position: absolute;
  top: 58px;
  z-index: 99;
  background-color: #aaaaaa;
}

.dot {
  position: absolute;
  top: 5px;
  width: 10px;
  height: 10px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #a2a9b4;
  opacity: 1;
  filter: alpha(opacity=100);
}

.pulse {
  position: absolute;
  top: -18px;
  left: -16px;
  height: 66px;
  width: 66px;
  border: 2px solid #009fd9;
  -webkit-border-radius: 48px;
  -moz-border-radius: 48px;
  border-radius: 48px;
  -webkit-box-shadow: 0 0 4px #009fd9, 0 0 10px #009fd9 inset;
  -moz-box-shadow: 0 0 4px #009fd9, 0 0 10px #009fd9 inset;
  box-shadow: 0 0 4px #009fd9, 0 0 10px #009fd9 inset;
  opacity: 0.12;
  filter: alpha(opacity=0);
  -webkit-animation: warn 2s ease-out both;
  -moz-animation: warn 2s ease-out both;
  -o-animation: warn 2s ease-out both;
  animation: warn 2s ease-out both;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background: 0 0;
}

.delay-01 {
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}

.delay-02 {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

@-webkit-keyframes warn {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@-moz-keyframes warn {
  0% {
    -moz-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -moz-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@-o-keyframes warn {
  0% {
    -o-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes warn {
  0% {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>