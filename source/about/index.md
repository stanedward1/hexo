---
title:
  关于我
date:
  2021-05-19 00:00:00
type:
  "about"
---

<div align=center>

<h1><img src="https://emojis.slackmojis.com/emojis/images/1531849430/4246/blob-sunglasses.gif?1531849430" width="30"/> Hey! Nice to see you 👋</h1>


<p>Welcome to my blog! </br> I'm longbiu, developer from <b>Changsha, China</b></p>
<p>I want to be a <b>Fullstack developer<img src="https://www.flaticon.com/premium-icon/icons/svg/3242/3242257.svg"width="35"/></b></p>


</div>

<br>
<div>
  <svg class="pie-chart"></svg>
  <script src="https://cdn.jsdelivr.net/npm/chart.xkcd@1.1/dist/chart.xkcd.min.js"></script>
  <script>
    const svg = document.querySelector('.pie-chart');
    const pieChart = new chartXkcd.Pie(svg, {
      title: 'Programming language', // optional
      data: {
        labels: ['Python', 'Ruby', 'Java', 'Javascript', 'Html', 'Css'],
        datasets: [{
          data: [300, 400, 200, 100, 50, 50],
        }],
      },
      options: { // optional
        innerRadius: 0.5,
        legendPosition: chartXkcd.config.positionType.upRight,
      },
    });
  </script>
  
</div>
