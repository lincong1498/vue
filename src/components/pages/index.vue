<template>
  <div>
    <div id="main" style="height:400px;width:500px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      charts: "",
      orderData: ["313", "340", "321", "456", "234", "567", "789"]
    };
  },
  methods: {
    drawLine() {
      this.charts = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "近一周订单数量"
        },
        tooltip: {},
        legend: {
          data: ["近一周订单数量"]
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {},
        series: [
          {
            name: "近一周订单数量",
            type: "line",
            data: this.orderData
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.charts.setOption(option);
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style>
</style>