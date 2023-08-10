import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from  'three/addons/libs/stats.module.js';
const scene = new THREE.Scene();
const width = window.innerWidth
const height = window.innerHeight
const renderer = new THREE.WebGLRenderer();
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
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(292, 223, 185);
//在原来相机位置基础上拉远，可以观察到更大的范围
 camera.position.set(800, 800, 800);
 camera.lookAt(0, 0, 0);
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 8000);
// // camera.position.set(292, 223, 185);
// // 超出视锥体远裁界面的范围的会被剪裁掉，不渲染  可以调整far参数适配
// camera.position.set(2000, 2000, 2000);
// camera.lookAt(0, 0, 0);
// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 相机控件.target属性在OrbitControls.js内部表示相机目标观察点，默认0,0,0
// console.log('controls.target', controls.target);
controls.target.set(1000, 0, 1000);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)

