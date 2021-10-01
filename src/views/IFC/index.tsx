import { 
  AmbientLight, 
  AxesHelper,
  PerspectiveCamera,
  Scene, 
  DirectionalLight,
  WebGLRenderer,
} from 'three';
import React, { useRef, useEffect } from 'react';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Button from '@material-ui/core/Button';

export default function IFCView(){
  const scene = new Scene();
  const size = {
    width: 1000,
    height: 500,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  const camera = new PerspectiveCamera(75, aspect);
  camera.position.z = 15;
  camera.position.y = 13;
  camera.position.x = 8;

  //Creates the lights of the scene
  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  const canvasRef = useRef(null);

  useEffect(()=>{
    const canvas = canvasRef.current;

    const renderer = new WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  });

  const loadIFC=()=>{
    const ifcLoader = new IFCLoader();
    const ifcURL = '/TESTED_Simple_project_01.ifc';
    ifcLoader.load(
      ifcURL,
      (ifcModel) => scene.add(ifcModel.mesh),
    );
  };


  return(
    <>
      <canvas ref={canvasRef}/>
      <Button onClick={loadIFC}>load model</Button>
    </>
  );
}