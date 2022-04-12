import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import Evaluate from '@/components/Evaluate';
import styles from './index.less';
import {
  PageHeader,
  Button,
  Divider,
  Input,
  Table,
  Card,
  Select,
  Checkbox,
  Form,
  Radio,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { data } from 'browserslist';

function userEvaluate(props) {
  const [data, setdata] = useState([]);

  const dataList = [
    {
      index3id: 1,
      index3Name: '取得办园许可证、法人证',
      index3Content: '是|否',
      type: '1',
      memo: '关键指标',
      content: 'A',
    },
    {
      index3id: 2,
      index3Name: '取得食品卫生许可证、食品经营许可证、税务登记证',
      index3Content: '是|否',
      type: '1',
      memo: '关键指标',
      content: 'B',
    },
    {
      index3id: 3,
      index3Name: '幼儿园的建设规模',
      index3Content: '3个班(90人)|6个班(180人)|9个班(270人)|12个班(360人)',
      type: '2',
    },
    {
      index3id: 4,
      index3Name:
        '幼儿园的班额能否满足大班(5--6周岁)35人、中班(4--5周岁)30人、小班(3--4周岁)25人',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 5,
      index3Name: '幼儿园的园舍建筑是否为三层以下',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 6,
      index3Name:
        '园舍主要用房的室内净高是否满足：活动室、寝室等净高不低于3.1m；办公及辅助用房的净高不低于2.6m；多功能活动室净高不低于3.6m',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 7,
      index3Name: '区角设置能满足',
      index3Content:
        '入口、道路、门厅、厕所灯按照《无障碍设施设计标准》安装无障碍设施|楼梯间有直接天然采光|楼梯踏步高度不高于150mm，宽度不小于260mm|楼梯设置成人、幼儿扶手且扶手端部无棱角',
      type: '3',
    },
    {
      index3id: 8,
      index3Name: '教学活动设施设备能满足',
      index3Content:
        '每班一间90平方米的活动室供开展室内游戏和各种活动|每班一间使用面积15平方米的卫生间，内设大小便槽(器)和淋浴池|每班一间使用面积9平方米的衣帽、教具贮藏室|全园含一个及以上的音体活动室，供开展音乐、舞蹈、体育活动等',
      type: '3',
    },
    {
      index3id: 9,
      index3Name: '生活设施设备能满足',
      index3Content: '每人一床|每人一套寝具|每人一套餐具|每人一个衣帽间(柜)',
      type: '3',
      memo: '关键指标',
    },
    {
      index3id: 10,
      index3Name:
        '是否认真落实幼儿园各项安全、卫生管理制度和措施，每学期开学前分析研判潜在的安全风险，有针对性地完善管理制度和措施',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 11,
      index3Name: '是否与警察、消防、卫生等部门合作建立联防联控机制',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 12,
      index3Name: '是否定期由专业人员开展卫生、安全监测',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 13,
      index3Name: '是否具备传染病、疫情等潜在危险的快速应对和防控处置能力',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 14,
      index3Name: '是否做好教职工、幼儿健康状况登记归档',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 15,
      index3Name: '安全保护能否做到',
      index3Content:
        '保教人员具有安全一定保护意识，接受过一定的专业培训|做好环境、设施设备、玩具材料方面的日常检查维护，及时消除安全隐患|发生意外时，优先保护幼儿的安全|切实把安全教育融入幼儿生活',
      type: '3',
    },
    {
      index3id: 16,
      index3Name: '是否存在体罚和变相体罚现象',
      index3Content: '不存在|存在',
      type: '1',
    },
    {
      index3id: 17,
      index3Name:
        '疾病预防方面，是否能做到定期开展疾病预防宣传教育，提高幼儿防控意识',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 18,
      index3Name:
        '疾病预防检测是否能做到依据幼儿年龄定期开展疫苗接种，并按资质要求配备专(兼)职人员，做好晨午检、健康观察、幼儿生长发育检测等工作',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 19,
      index3Name: '是否能科学制定带量食谱，确保幼儿膳食营养均衡',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 20,
      index3Name: '是否定期检查食品供应商的资质、生产车间、卫生安全状况等',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 21,
      index3Name: '生活起居能做到',
      index3Content:
        '帮助幼儿建立合理生活常规，引导幼儿根据需要自主饮水、洗漱、如厕、增减衣物等|指导幼儿进行餐前准备、餐后清洁、玩具整理等自我服务|引导幼儿养成劳动习惯|制定并实施与幼儿身体发展相适应的锻炼计划，保证每天户外活动时间',
      type: '3',
      memo: '关键指标',
    },
    {
      index3id: 22,
      index3Name: '能否引导幼儿在生活、学习中增强集体责任感',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 23,
      index3Name:
        '教职工能否保持积极乐观愉快的情绪状态，以亲切和蔼、支持性的态度和行为与幼儿互动',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 24,
      index3Name:
        '教职工能否关注幼儿学习与发展的整体性，注重健康、语言、社会、科学、艺术等各项领域有机结合，促进幼儿智力和非智力因素协调发展',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 25,
      index3Name:
        '能否做到幼儿园与家长建立平等互动关系，教师及时与家长分享幼儿的成长与进步，了解幼儿在家庭中的表现，认真倾听家长的意见建议',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 26,
      index3Name:
        '家长是否有机会体验幼儿园的生活，参与幼儿园管理，积极支持幼儿园的工作，成为幼儿园的合作伙伴',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 27,
      index3Name:
        '是否能根据幼儿年龄阶段和时代发展指定科学合理的教学任务和课程规划',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 28,
      index3Name: '教师是否能',
      index3Content:
        '有坚定的政治信仰|按照“四有”好教师标准履行幼儿园教师职业道德规范|爱岗敬业，关爱幼儿，严格自律|杜绝体罚或变相体罚等有损幼儿身心健康的行为',
      type: '3',
    },
    {
      index3id: 29,
      index3Name:
        '是否能做到幼儿园教职工按国家和地方相关要求配备到位，并做到持证上岗，无岗位空缺和无证上岗情况',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 30,
      index3Name: '大专及以上学历教师比例',
      index3Content: '<40%|40%--60%(不含)|60%--80%(不含)|≥80%',
      type: '2',
      memo: '关键指标',
    },
    {
      index3id: 31,
      index3Name:
        '园长能否与教职工共同研究制定符合教职工自身特点的专业发展规划，提供发展空间，支持他们有计划地达成专业发展目标',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 32,
      index3Name: '幼儿园能够',
      index3Content:
        '指定合理的教研制度并有效落实|教研工作聚焦解决实践中的困惑和问题|注重激发教师积极主动反思|注重提高教师实践能力，增强教师专业自信',
      type: '3',
    },
    {
      index3id: 33,
      index3Name: '园长能够',
      index3Content:
        '深入班级了解师幼互动过程|与教师、家长研究教育实践问题|形成协同学习、相互支持的良好氛围|具有五年以上幼儿园教师或管理工作经历，具有较强的专业领导力',
      type: '3',
    },
    {
      index3id: 34,
      index3Name:
        '幼儿园的激励机制包括()，以实现对教职工工作积极性的调动、激励',
      index3Content: '表彰奖励|薪酬待遇|职称评定|岗位晋升',
      type: '3',
    },
    {
      index3id: 35,
      index3Name: '幼儿园是否能树立正确激励导向，突出日常保育教育时间成效',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 36,
      index3Name:
        '能否能健全党组织对幼儿园工作领导的制度机制，以政治建设为统领，加强幼儿园领导班子建设，推进党的工作与保育教育工作相结合',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 37,
      index3Name:
        '能否全面贯彻党的方针，落实立德树人根本任务，坚持保育教育结合，将培育和践行社会主义核心价值观融入保育教育全过程',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 38,
      index3Name:
        '能否注重幼儿良好品德和行为习惯养成，潜移默化贯穿与生活和学习中，创设温暖、关爱、平等的集体生活氛围，建立积极和谐的同伴关系',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 39,
      index3Name:
        '能否遵循幼儿身心发展规律和学前教育规律，尊重幼儿个体差异，坚持以游戏为基本活动，珍视生活和游戏的独特教育价值',
      index3Content: '是|否',
      type: '1',
    },
    {
      index3id: 40,
      index3Name: '教职工能否有效遵守请假制度、安全责任制度、卫生制度',
      index3Content: '是|否',
      type: '1',
    },
  ];

  const judgeItems = [
    // 判断题选项
    { label: '是', value: 'A' },
    { label: '否', value: 'B' },
  ];

  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        {dataList.map((data, index) => {
          return (
            <div key={data.index3id}>
              <Form.Item name={data.index3id} className={styles.questionArea}>
                <div>
                  <div className={styles.question}>
                    <p>
                      {index + 1}、{data.index3Name} ______ 。
                      {data.memo == undefined ? '' : '(' + data.memo + ')'}{' '}
                    </p>
                    {data.type == '3' ? (
                      <Checkbox.Group
                        defaultValue={
                          data.content == undefined
                            ? []
                            : data.content.split('')
                        }
                        options={[
                          {
                            label: data.index3Content.split('|')[0],
                            value: 'A',
                          },
                          {
                            label: data.index3Content.split('|')[1],
                            value: 'B',
                          },
                          {
                            label: data.index3Content.split('|')[2],
                            value: 'C',
                          },
                          {
                            label: data.index3Content.split('|')[3],
                            value: 'D',
                          },
                        ]}
                      />
                    ) : data.type == '2' ? (
                      <Radio.Group
                        defaultValue={
                          data.content == undefined ? [] : data.content
                        }
                        options={[
                          {
                            label: data.index3Content.split('|')[0],
                            value: 'A',
                          },
                          {
                            label: data.index3Content.split('|')[1],
                            value: 'B',
                          },
                          {
                            label: data.index3Content.split('|')[2],
                            value: 'C',
                          },
                          {
                            label: data.index3Content.split('|')[3],
                            value: 'D',
                          },
                        ]}
                      />
                    ) : (
                      <Radio.Group
                        options={judgeItems}
                        defaultValue={
                          data.content == undefined ? [] : data.content
                        }
                      />
                    )}
                  </div>

                  <div className={styles.evidence}>
                    <Upload>
                      <Button htmlType="submit" icon={<UploadOutlined />}>
                        上传证据文件
                      </Button>
                    </Upload>
                  </div>

                  <Divider />
                </div>
              </Form.Item>
            </div>
          );
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default userEvaluate;
