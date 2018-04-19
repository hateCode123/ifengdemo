const { listTransform } = require('../../../common/transform');
const redis = require('../../../common/redis');
const logger = require('../../../common/logger');
const indexService = require('../../../services/index');
const { KVProxy } = require('../../../providers/ucmsapiProxy');

const { jsonParse, handleData, handleJson, handleJsonbByKey, handleJs } = require('../../../services/common/common');

exports.index = {
    path: '/index',
    method: 'get',
    handler: async ctx => {
        const originData = await indexService.getOriginData();
        const mainContent = await indexService.getMainContent();
        const siderList = await listTransform(originData);

        let testFunction = await KVProxy.getStaticFragment(10013).then(...handleJs(ctx, 'content', true));

        const data = {
            msg: 'HELLO WORLD',
            API: {
                getList: () => {
                    return [
                        { name: 'apple', age: 27 },
                        { name: 'banner', age: 25 },
                        { name: 'bick', age: 24 },
                        { name: 'pick', age: 23 },
                    ];
                },
                mainContent: () => {
                    return '<p>原标题：特战部队&ldquo;金牌教头&rdquo;当选全国人大代表</p><p>法制晚报&middot;看法新闻（记者杨小嘉编辑岳三猛）2月24日，第十三届全国人民代表大会解放军代表名单公布，共269人。</p><p>看法新闻记者注意到，第80集团军&ldquo;雄鹰&rdquo;特战旅政委武仲良在列。这名侦察兵出身的政委一身肌肉，被称&ldquo;魅力政委&rdquo;、&ldquo;金牌教练&rdquo;。</p><p class="detailPic"><img data-copyright="0" data-ratio="1.5" data-s="300,640" data-type="jpeg" data-w="600" style="" src="http://p3.ifengimg.com/fck/2018_09/5915a886b6c7a3b_w600_h900.jpg" alt="" /></p><p class="picIntro"><span>（武仲良）</span></p><p><strong>连长直升营长！他两次获破格提拔</strong></p><p>&ldquo;雄鹰&rdquo;特战旅是一支英雄的部队。在战争年代，曾涌现出2个功臣营、6个大功连和5名英模功臣。1994年改为特种部队以来，先后荣立集体一等功、二等功、三等功，是全军特种部队中唯一荣立集体一等功的。</p><p>看法新闻记者此前曾介绍过，武仲良系安徽宿县人，1969年9月出生，1989年3月参军，第二年，这名侦察兵在全师比武中夺得第一名，荣立三等功。由于表现突出，被直接晋升为上士，担任班长，随后提干。2000年，已经担任连长的他再次被破格提拔，直接晋升为营长。</p><p class="detailPic"><img data-copyright="0" data-ratio="0.6666666666666666" data-s="300,640" data-type="jpeg" data-w="600" style="" src="http://p3.ifengimg.com/fck/2018_09/2e3f3ba59d94db8_w600_h400.jpg" alt="" /></p><p>而这一切不是幸运和偶然。在新兵连时练倒功，别人连倒5次疼得受不了，他连倒20次。别人跑5公里，他跑10公里，一有业余时间再负重跑。体能训练消耗大，他每天吃晚饭时都悄悄往兜里装四五个馒头。</p><p>新兵连生活结束，武仲良取得攀登格斗、越野跑等10个课目中的6个第一。</p><p>长期的高强度训练，让他收获荣誉的同时，身体也承受了不少的伤痛。即便如此，在练兵时，跳伞、潜水、狙击等特战技能他都能示范，一些课目甚至不输年轻官兵。</p><p>2013年年底，武仲良任政委。每天下午，他都会出现在旅里的训练场上，跑步、拉单杠、过障碍，一练就是两个小时。有的官兵说，看到政委兵龄最长、年龄最大、军衔最高还这样刻苦训练，自己没有理由不练好。</p><p class="detailPic"><img data-copyright="0" data-ratio="0.6663636363636364" data-s="300,640" data-type="jpeg" data-w="1100" style="" src="http://p3.ifengimg.com/fck/2018_09/61013e9a02f45d9_w1080_h720.jpg" alt="" /></p><p>在上任特战旅政委后的第一次军人大会上，武仲良郑重承诺：不抽官兵一根烟、不占官兵一分钱、不吃官兵一顿饭。他还向全体官兵公布了自己的电话号码，随时接受大家监督。</p><p>武仲良还有一个&ldquo;爱好&rdquo;，就是&ldquo;蹲点&rdquo;。吃饭时和新兵们一起打饭，晚上睡觉也是随便挑一个宿舍，和战士们睡一起。刚开始时，战士们看到这个扛着四颗星的大校心里都很胆怯，时间长了之后，大家对他的突然造访就见怪不怪了。</p><p><strong>他将功夫瑜伽引入特战部队</strong></p><p>看法新闻记者注意到，武仲良还特别关爱战士，比如在训练后恢复方面，他就想了很多&ldquo;高招&rdquo;。</p><p>武仲良认为，高强度训练后没有得到适当恢复，很容易导致训练伤。为此，他推动建成了全军旅团级单位第一家军事训练健康保护中心，官兵们训练结束后可以去磁疗、针灸，放松疲惫的身体。</p><p class="detailPic"><img data-copyright="0" data-ratio="0.66640625" data-s="300,640" data-type="jpeg" data-w="1280" style="" src="http://p3.ifengimg.com/fck/2018_09/0b48033615a6f2d_w1080_h720.jpg" alt="" /></p><p class="picIntro"><span>（武仲良在练瑜伽）</span></p><p>而就在2017年年底，另一则消息刷屏网络：&ldquo;雄鹰&rdquo;特战旅官兵竟然集体练起了瑜伽，而带头人正是武仲良！</p><p>当时，特种兵格斗基本功考核，武仲良摇起了头，认为动作不稳，身体僵硬，而原因就是柔韧性、协调性还不够。</p><p>为了解决这一问题，他请来专业的瑜伽教学团队，而老师们重新编排设计，形成了适合特种兵训练的两套动作。一字马、倒立、单腿拉弓、横叉&hellip;&hellip;现在，官兵们不仅提高了协调性和柔韧性，还对科学规避训练伤有了新的认识。</p><p class="detailPic"><img data-copyright="0" data-ratio="0.68828125" data-s="300,640" data-type="jpeg" data-w="1280" style="" src="http://p3.ifengimg.com/fck/2018_09/e5b70ed7cf0c9b5_w1080_h743.jpg" alt="" /></p><p class="picIntro"><span>今年1月中旬，看法新闻记者随教瑜伽的老师来到&ldquo;雄鹰&rdquo;特战旅，目击了官兵们学习功夫瑜伽的全过程。</span></p><p>&ldquo;绷脚，腿要直，往上甩，再高，手按直，上身不要晃。&rdquo;2018年1月，满满雄性荷尔蒙的军营里，女教员赵扬正在向官兵们展示瑜伽通身术这个&ldquo;独门秘籍&rdquo;。</p><p>晚上7：30，大礼堂灯火通明，赵扬在给战士们示范讲解她专门为军人设计的特种兵瑜伽通身术。一个动作下来，大家满身大汗，坚持到最后时四肢发颤，脸上表情纠结。</p><p class="detailPic"><img data-copyright="0" data-ratio="0.66640625" data-s="300,640" data-type="jpeg" data-w="1280" style="" src="http://p3.ifengimg.com/fck/2018_09/10cdfe954edddc4_w1080_h720.jpg" alt="" /></p><p>为了提高大家的学习兴趣，赵扬请战士上前与她练推手，别看赵老师身材娇小，可与之互动的官兵竟无一人能敌。&ldquo;主要是心理上缺乏耐心，生理上发力不对，瑜伽通身术能让人从心理和生理上均能得到有效锻炼。&rdquo;</p><p>官兵表示，训练时很累，但完了感觉精神很好；尤其是针对腰和膝盖的病痛，能够得到有效的治疗。还有人说，之前跑步韧带受伤，做动作时都不敢伸直，绷得疼；在练了两个月后，现在敢伸直了。<span class="ifengLogo"><a href="http://www.ifeng.com/" target="_blank"><img src="http://p2.ifengimg.com/a/2016/0810/204c433878d5cf9size1_w16_h16.png"/></a></span></p>';
                },
            },
            jsonData: {
                siderList,
                mainContent,
            },
            testFunction,
        };

        await ctx.html('index', data);
    },
};
