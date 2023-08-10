import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Stats from  'three/addons/libs/stats.module.js';
const stats = new Stats();
// stats.domElement显示：渲染帧率  刷新频率,一秒渲染次数 
stats.setMode(0);//默认模式
//stats.domElement显示：渲染周期 渲染一帧多长时间(单位：毫秒ms)
  stats.setMode(1000);
const scene = new THREE.Scene();
//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
    transparent: true,//开启透明
    opacity: 0.5,//设置透明度
});
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        scene.add(mesh); //网格模型添加到场景中  
    }
}

// const geometry = new THREE.BoxGeometry( 50, 50, 50 );
// //受不受光照影响
// //不受
// const material = new THREE.MeshLambertMaterial( { 
//     color: 0x00ff00,
//     transparent: true,
//     opacity: 0.5
// } );
//受
// const material = new THREE.MeshLambertMaterial( );
// const material = new THREE.MeshPhongMaterial( );
// const material = new THREE.MeshNormalMaterial( );

const mesh = new THREE.Mesh( geometry, material );

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight  = new THREE.PointLight( 0xffffff, 1.0 );
const pointLinghtHelper = new THREE.PointLightHelper( pointLight,10)
//点光源的位置
pointLight.position.set( -400, -200, -300 );
//点光源的强度
pointLight.intensity = 8;
scene.add(pointLinghtHelper)
scene.add( pointLight );

//环境光：没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff,0.4)

mesh.position.set(0,10,0);
scene.add( mesh );
scene.add(ambient)
// AxesHelper：辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper( 500 );
// scene.add( axesHelper );

//定义相机输出画布的大小
// const width = 1500;
// const height = 800;
//全屏渲染
const width = window.innerWidth
const height = window.innerHeight
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 3000 );
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200,200,200);
// 设置相机方向
camera.lookAt(mesh.position);
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
renderer.render( scene, camera );
document.body.appendChild( renderer.domElement );

//设置相机控件轨道控制器
const controls = new OrbitControls( camera, renderer.domElement );
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener( 'change', render );
function render() {
    renderer.render( scene, camera );
     // 浏览器控制台查看相机位置变化
    // console.log('camera.position',camera.position);
}
const clock = new THREE.Clock();
//自动旋转事件
function renders() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
	stats.update();
    const spt = clock.getDelta()*1000;
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotation.x += 0.01;//每次绕y轴旋转0.01弧度
    mesh.rotation.y += 0.01;//每次绕y轴旋转0.01弧度
    
    requestAnimationFrame(renders);//请求再次执行渲染函数render，渲染下一帧
}
renders()
// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};
// 随机创建大量的模型,测试渲染性能
const num = 1000; //控制长方体模型数量
for (let i = 0; i < num; i++) {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 随机生成长方体xyz坐标
    const x = (Math.random() - 0.5) * 200
    const y = (Math.random() - 0.5) * 200
    const z = (Math.random() - 0.5) * 200
    mesh.position.set(x, y, z)
    scene.add(mesh); // 模型对象插入场景中
}




