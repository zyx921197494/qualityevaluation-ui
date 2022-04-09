// import logo from '@/image/logo.png';
import styles from './index.less';

function Home(props) {
  return (
    <div className={styles.home}>
      <div className={styles.logo}>{/* <img src={logo} /> */}</div>
      <div className={styles.intro}>
        <div className={styles.first}>可视化搭建工具</div>
        <div className={styles.second}>简易拖拽，生成源码，所见即所得</div>
        <div
          className={styles.start}
          onClick={() => props.history.push('/viperCode/warehouse')}
        >
          开始
        </div>
      </div>
    </div>
  );
}

export default Home;
