import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import * as TextureModule from "../Modules/Materials_Module.js"
import * as Calculations from "../Modules/Calculations.js"
import SceneComponent from "../Babylon_components/SceneComponent";


import sunTexture from "../Scenes/solar_system_textures/2k_sun.jpg";
import mercuryTexture from "../Scenes/solar_system_textures/2k_mercury.jpg";
import venusTexture from "../Scenes/solar_system_textures/2k_venus_surface.jpg";
import earthTexture from "../Scenes/solar_system_textures/2k_earth_daymap.jpg";
import marsTexture from "../Scenes/solar_system_textures/2k_mars.jpg";
import jupiterTexture from "../Scenes/solar_system_textures/2k_jupiter.jpg";
import saturnTexture from "../Scenes/solar_system_textures/2k_saturn.jpg";
import saturnRingTexture from "../Scenes/solar_system_textures/2k_saturn_ring_alpha.png";
import uranusTexture from "../Scenes/solar_system_textures/2k_uranus.jpg";
import neptuneTexture from "../Scenes/solar_system_textures/2k_neptune.jpg";




// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


const onSceneReady = (e) => {
    //Scale 1:1000
    
    
    const sunScale  = 1/500000;
    const planetsScales =  1/50000;
    const distanceScales = sunScale/45;

    const points = 360;


    const { canvas, scene, engine } = e;
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

 
    const sunLight = new BABYLON.PointLight("sunLight", new BABYLON.Vector3(0, 0, 0), scene);
    sunLight.intensity = 1;
    sunLight.diffuse = new BABYLON.Color3(255/255,165/255,1);
   
    


    //Display 3D axes
    const axes3D = new BABYLON.AxesViewer(scene,2)
    const localAxes = new BABYLON.AxesViewer(scene, 1);

    //Radius of the planets in km
    var sunRadius = 696340 * sunScale;
    var mercuryRadius = 2439.7 * planetsScales;
    var venusRadius = 6051.8 * planetsScales;
    var earthRadius = 6371 * planetsScales;
    var marsRadius = 3389.5 * planetsScales;
    var jupiterRadius = 69911 * planetsScales;
    var saturnRadius = 58232 * planetsScales;
    var saturnDiscRadius = 136775 * planetsScales;
    var uranusRadius = 25362 * planetsScales;
    var neptuneRadius = 24622 * planetsScales;

    //Options of the planets
    var sunOptions = {
        diameterX:2*sunRadius,
        diameterY:2*sunRadius,
        diameterZ:2*sunRadius
    }

    var mercuryOptions = {
        diameterX:2*mercuryRadius,
        diameterY:2*mercuryRadius,
        diameterZ:2*mercuryRadius
    }

    var venusOptions = {
        diameterX:2*venusRadius,
        diameterY:2*venusRadius,
        diameterZ:2*venusRadius
    }

    var earthOptions = {
        diameterX:2*earthRadius,
        diameterY:2*earthRadius,
        diameterZ:2*earthRadius
    }

    var marsOptions = {
        diameterX:2*marsRadius,
        diameterY:2*marsRadius,
        diameterZ:2*marsRadius
    }

    var jupiterOptions = {
        diameterX:2*jupiterRadius,
        diameterY:2*jupiterRadius,
        diameterZ:2*jupiterRadius
    }

    var saturnOptions = {
        diameterX:2*saturnRadius,
        diameterY:2*saturnRadius,
        diameterZ:2*saturnRadius
    }

    var saturnDiscOptions = {
        diameter: 2*saturnDiscRadius,
        thickness: 69875*planetsScales,
    }

    var uranusOptions = {
        diameterX:2*uranusRadius,
        diameterY:2*uranusRadius,
        diameterZ:2*uranusRadius
    }

    var neptuneOptions = {
        diameterX:2*neptuneRadius,
        diameterY:2*neptuneRadius,
        diameterZ:2*neptuneRadius
    }

    //Our planets
    var sun = BABYLON.MeshBuilder.CreateSphere("sun",sunOptions,scene)
    var mercury = BABYLON.MeshBuilder.CreateSphere("mercury",mercuryOptions,scene)
    var venus = BABYLON.MeshBuilder.CreateSphere("venus",venusOptions,scene)
    var earth = BABYLON.MeshBuilder.CreateSphere("earth",earthOptions,scene)
    var mars = BABYLON.MeshBuilder.CreateSphere("mars",marsOptions,scene)
    var jupiter = BABYLON.MeshBuilder.CreateSphere("jupiter",jupiterOptions,scene)
    var saturn = BABYLON.MeshBuilder.CreateSphere("saturn",saturnOptions,scene)

    var saturnDisc = BABYLON.MeshBuilder.CreateTorus("saturnDisc",saturnDiscOptions,scene)
    saturnDisc.scaling = new BABYLON.Vector3(1,0.005,1)

    var uranus = BABYLON.MeshBuilder.CreateSphere("uranus",uranusOptions,scene)
    var neptune = BABYLON.MeshBuilder.CreateSphere("neptune",neptuneOptions,scene)

    const shadowGenerator = new BABYLON.ShadowGenerator(2048, sunLight);

    shadowGenerator.addShadowCaster(mercury);
    shadowGenerator.addShadowCaster(venus);
    shadowGenerator.addShadowCaster(earth);
    shadowGenerator.addShadowCaster(mars);
    shadowGenerator.addShadowCaster(jupiter);
    shadowGenerator.addShadowCaster(saturn);
    shadowGenerator.addShadowCaster(uranus);
    shadowGenerator.addShadowCaster(neptune);

    shadowGenerator.usePoissonSampling = true;

    mercury.receiveShadows = true;
    venus.receiveShadows = true;
    earth.receiveShadows = true;
    mars.receiveShadows = true;
    jupiter.receiveShadows = true;
    saturn.receiveShadows = true;
    uranus.receiveShadows = true;
    neptune.receiveShadows = true;


    //Textures setup
    var sunMaterial = TextureModule.MaterialFromTexture("sunTexture", {diffuseTexture: sunTexture},scene);
    sunMaterial.emissiveColor = new BABYLON.Color3(1,1,1);
    sun.material = sunMaterial;

    var mercuryMaterial = TextureModule.MaterialFromTexture("mercuryTexture", {diffuseTexture: mercuryTexture},scene);
    mercury.material = mercuryMaterial;
    
    var venusMaterial = TextureModule.MaterialFromTexture("venusTexture", {diffuseTexture: venusTexture},scene);
    venus.material = venusMaterial;

    var earthMaterial = TextureModule.MaterialFromTexture("earthTexture", {diffuseTexture: earthTexture},scene);
    earth.material = earthMaterial;

    var marsMaterial = TextureModule.MaterialFromTexture("marsTexture", {diffuseTexture: marsTexture},scene);
    mars.material = marsMaterial;

    var jupiterMaterial = TextureModule.MaterialFromTexture("jupiterTexture", {diffuseTexture: jupiterTexture},scene);
    jupiter.material = jupiterMaterial;

    var saturnMaterial = TextureModule.MaterialFromTexture("saturnTexture", {diffuseTexture: saturnTexture},scene);
    
    saturn.material = saturnMaterial;

    var saturnDiscMaterial = TextureModule.MaterialFromTexture("saturnDiscTexture", {diffuseTexture: saturnRingTexture},scene);
    //saturnDiscMaterial.alpha = 0.5;

    var uranusMaterial = TextureModule.MaterialFromTexture("uranusTexture", {diffuseTexture: uranusTexture},scene);
    uranus.material = uranusMaterial;

    var neptuneMaterial = TextureModule.MaterialFromTexture("neptuneTexture", {diffuseTexture: neptuneTexture},scene);
    neptune.material = neptuneMaterial;

    sunLight.position = sun.position

    camera.setTarget(jupiter.position)

    var sunAxialTilt = Calculations.deegreesToRadians(7.25);
    var sunAxisRotationalPeriod = 609.12;
    var sunAxisRotationSpeed = sunAxisRotationalPeriod/360;
    var sunAxisRotationSpeed = Calculations.deegreesToRadians(sunAxisRotationSpeed);

    var mercuryEccentricity = 0.205630;
    var mercurySemiMajorAxis = 57909227*distanceScales;
    var mercury_orbit_center = new BABYLON.Vector3(Calculations.aphelion(mercurySemiMajorAxis,mercuryEccentricity)-Calculations.periphelion(mercurySemiMajorAxis,mercuryEccentricity),0,0)
    var mercuryOrbitPoints = Calculations.pointsOnEllipse(mercurySemiMajorAxis,mercuryEccentricity,360)
    var mercuryOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: mercuryOrbitPoints }, scene);
    var mercuryAxialTilt = Calculations.deegreesToRadians(0.034);
    //Every 1407.6 hours it completes a rotation around its axis which means 360 degrees
    var mercuryAxisRotationalPeriod = 1407.6;
    //Every 87.969 days it completes an orbit around the sun which means 360 degrees
    var mercuryOrbitPeriod = 87.969*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var mercuryAxisRotationSpeed = Calculations.deegreesToRadians(360)/mercuryAxisRotationalPeriod; 
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var mercuryOrbitSpeed = Calculations.deegreesToRadians(360)/mercuryOrbitPeriod;

    mercuryOrbit.setPivotPoint(mercury_orbit_center);
    mercuryOrbit.translate(mercury_orbit_center,-1)
    mercuryOrbit.parent = sun;
    mercuryOrbit.rotation.z = Calculations.deegreesToRadians(7.005);
    mercuryOrbit.rotation.y = Calculations.deegreesToRadians(48.331);
    mercury.parent = mercuryOrbit
    mercuryOrbit.color = BABYLON.Color3.Red();

    var venusEccentricity = 0.006772;
    var venusSemiMajorAxis = 108209475*distanceScales;
    var venus_orbit_center = new BABYLON.Vector3(Calculations.aphelion(venusSemiMajorAxis,venusEccentricity)-Calculations.periphelion(venusSemiMajorAxis,venusEccentricity),0,0)
    var venusOrbitPoints = Calculations.pointsOnEllipse(venusSemiMajorAxis,venusEccentricity,360)
    var venusOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: venusOrbitPoints }, scene);
    var venusAxialTilt = Calculations.deegreesToRadians(177.36);
    //Every 5832.5 days it completes a rotation around its axis which means 360 degrees
    var venusAxisRotationalPeriod = 5832.5;
    //Every 224.701 days it completes an orbit around the sun which means 360 degrees
    var venusOrbitPeriod = 224.701*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var venusAxisRotationSpeed = Calculations.deegreesToRadians(360)/venusAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var venusOrbitSpeed = Calculations.deegreesToRadians(360)/venusOrbitPeriod;

    
    venusOrbit.setPivotPoint(venus_orbit_center);
    venusOrbit.translate(venus_orbit_center,-1)
    venusOrbit.parent = sun;
    venusOrbit.rotation.z = Calculations.deegreesToRadians(3.394);
    venusOrbit.rotation.y = Calculations.deegreesToRadians(76.680);
    venus.parent = venusOrbit
    venusOrbit.color = BABYLON.Color3.Green();

    var earthEccentricity = 0.0167086;
    var earthSemiMajorAxis = 149598262*distanceScales;
    var earth_orbit_center = new BABYLON.Vector3(Calculations.aphelion(earthSemiMajorAxis,earthEccentricity)-Calculations.periphelion(earthSemiMajorAxis,earthEccentricity),0,0)
    var earthOrbitPoints = Calculations.pointsOnEllipse(earthSemiMajorAxis,earthEccentricity,360)
    var earthOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: earthOrbitPoints }, scene);
    var earthAxialTilt = Calculations.deegreesToRadians(23.439281);
    //Every 23.9344699 hours it completes a rotation around its axis which means 360 degrees
    var earthAxisRotationalPeriod = 23.9344699;
    //Every 365.256363004 days it completes an orbit around the sun which means 360 degrees
    var earthOrbitPeriod = 365.256363004*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var earthAxisRotationSpeed = Calculations.deegreesToRadians(360)/earthAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var earthOrbitSpeed = Calculations.deegreesToRadians(360)/earthOrbitPeriod;
    
    earthOrbit.setPivotPoint(earth_orbit_center);
    earthOrbit.translate(earth_orbit_center,-1)
    earthOrbit.parent = sun;
    earthOrbit.rotation.z = Calculations.deegreesToRadians(7.155);
    earthOrbit.rotation.y = Calculations.deegreesToRadians(-11.26064);
    earth.parent = earthOrbit
    earthOrbit.color = BABYLON.Color3.Blue();


    var marsEccentricity = 0.0934;
    var marsSemiMajorAxis = 227943824*distanceScales;
    var mars_orbit_center = new BABYLON.Vector3(Calculations.aphelion(marsSemiMajorAxis,marsEccentricity)-Calculations.periphelion(marsSemiMajorAxis,marsEccentricity),0,0)
    var marsOrbitPoints = Calculations.pointsOnEllipse(marsSemiMajorAxis,marsEccentricity,360)
    var marsOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: marsOrbitPoints }, scene);
    var marsAxialTilt = Calculations.deegreesToRadians(25.19);
    //Every 24.622962 hours it completes a rotation around its axis which means 360 degrees
    var marsAxisRotationalPeriod = 24.622962;
    //Every 686.971 days it completes an orbit around the sun which means 360 degrees
    var marsOrbitPeriod = 686.971*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var marsAxisRotationSpeed = Calculations.deegreesToRadians(360)/marsAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var marsOrbitSpeed = Calculations.deegreesToRadians(360)/marsOrbitPeriod;

    marsOrbit.setPivotPoint(mars_orbit_center);
    marsOrbit.translate(mars_orbit_center,-1)
    marsOrbit.parent = sun;
    marsOrbit.rotation.z = Calculations.deegreesToRadians(1.850);
    marsOrbit.rotation.y = Calculations.deegreesToRadians(49.578);
    mars.parent = marsOrbit
    marsOrbit.color = BABYLON.Color3.Red();

    var jupiterEccentricity = 0.0489;
    var jupiterSemiMajorAxis = 778340821*distanceScales;
    var jupiter_orbit_center = new BABYLON.Vector3(Calculations.aphelion(jupiterSemiMajorAxis,jupiterEccentricity)-Calculations.periphelion(jupiterSemiMajorAxis,jupiterEccentricity),0,0)
    var jupiterOrbitPoints = Calculations.pointsOnEllipse(jupiterSemiMajorAxis,jupiterEccentricity,360)
    var jupiterOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: jupiterOrbitPoints }, scene);
    var jupiterAxialTilt = Calculations.deegreesToRadians(3.13);
    //Every 9.925 hours it completes a rotation around its axis which means 360 degrees
    var jupiterAxisRotationalPeriod = 9.925;
    //Every 4332.59 days it completes an orbit around the sun which means 360 degrees
    var jupiterOrbitPeriod = 4332.59*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var jupiterAxisRotationSpeed = Calculations.deegreesToRadians(360)/jupiterAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var jupiterOrbitSpeed = Calculations.deegreesToRadians(360)/jupiterOrbitPeriod;
    

    
   
    jupiterOrbit.setPivotPoint(jupiter_orbit_center);
    jupiterOrbit.translate(jupiter_orbit_center,-1)
    jupiterOrbit.parent = sun;
    jupiterOrbit.rotation.z = Calculations.deegreesToRadians(1.305);
    jupiterOrbit.rotation.y = Calculations.deegreesToRadians(100.464);
    jupiter.parent = jupiterOrbit
    jupiterOrbit.color = BABYLON.Color3.Green();

    var saturnEccentricity = 0.0565;
    var saturnSemiMajorAxis = 1426666422*distanceScales;
    var saturn_orbit_center = new BABYLON.Vector3(Calculations.aphelion(saturnSemiMajorAxis,saturnEccentricity)-Calculations.periphelion(saturnSemiMajorAxis,saturnEccentricity),0,0)
    var saturnOrbitPoints = Calculations.pointsOnEllipse(saturnSemiMajorAxis,saturnEccentricity,360)
    var saturnOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: saturnOrbitPoints }, scene);
    var saturnAxialTilt = Calculations.deegreesToRadians(26.73);
    //Every 10.656 hours it completes a rotation around its axis which means 360 degrees
    var saturnAxisRotationalPeriod = 10.656;
    //Every 10759.22 days it completes an orbit around the sun which means 360 degrees
    var saturnOrbitPeriod = 10759.22*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var saturnAxisRotationSpeed = Calculations.deegreesToRadians(360)/saturnAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var saturnOrbitSpeed = Calculations.deegreesToRadians(360)/saturnOrbitPeriod;

    saturnOrbit.setPivotPoint(saturn_orbit_center);
    saturnOrbit.translate(saturn_orbit_center,-1)
    saturnOrbit.parent = sun;
    saturnOrbit.rotation.z = Calculations.deegreesToRadians(2.484);
    saturnOrbit.rotation.y = Calculations.deegreesToRadians(113.665);
    saturn.parent = saturnOrbit
    saturnOrbit.color = BABYLON.Color3.Blue();

    saturnDisc.parent = saturn;

    var uranusEccentricity = 0.046381;
    var uranusSemiMajorAxis = 2870658186*distanceScales;
    var uranus_orbit_center = new BABYLON.Vector3(Calculations.aphelion(uranusSemiMajorAxis,uranusEccentricity)-Calculations.periphelion(uranusSemiMajorAxis,uranusEccentricity),0,0)
    var uranusOrbitPoints = Calculations.pointsOnEllipse(uranusSemiMajorAxis,uranusEccentricity,360)
    var uranusOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: uranusOrbitPoints }, scene);
    var uranusAxialTilt = Calculations.deegreesToRadians(97.77);
    //Every 17.24 hours it completes a rotation around its axis which means 360 degrees
    var uranusAxisRotationalPeriod = 17.24;
    //Every 30685.4 days it completes an orbit around the sun which means 360 degrees
    var uranusOrbitPeriod = 30685.4*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var uranusAxisRotationSpeed = Calculations.deegreesToRadians(360)/uranusAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var uranusOrbitSpeed = Calculations.deegreesToRadians(360)/uranusOrbitPeriod;

    uranusOrbit.setPivotPoint(uranus_orbit_center);
    uranusOrbit.translate(uranus_orbit_center,-1)
    uranusOrbit.parent = sun;
    uranusOrbit.rotation.z = Calculations.deegreesToRadians(0.769);
    uranusOrbit.rotation.y = Calculations.deegreesToRadians(74.006);
    uranus.parent = uranusOrbit
    uranusOrbit.color = BABYLON.Color3.Red();

    var neptuneEccentricity = 0.009456;
    var neptuneSemiMajorAxis = 4498396441*distanceScales;
    var neptune_orbit_center = new BABYLON.Vector3(Calculations.aphelion(neptuneSemiMajorAxis,neptuneEccentricity)-Calculations.periphelion(neptuneSemiMajorAxis,neptuneEccentricity),0,0)
    var neptuneOrbitPoints = Calculations.pointsOnEllipse(neptuneSemiMajorAxis,neptuneEccentricity,360) 
    var neptuneOrbit = BABYLON.MeshBuilder.CreateLines("ellipse", { points: neptuneOrbitPoints }, scene);
    var neptuneAxialTilt = Calculations.deegreesToRadians(28.32);
    //Every 16.11 hours it completes a rotation around its axis which means 360 degrees
    var neptuneAxisRotationalPeriod = 16.11;
    //Every 60190 days it completes an orbit around the sun which means 360 degrees
    var neptuneOrbitPeriod = 60190*24;
    //The speed of the rotation around its axis is 360 degrees divided by the time it takes to complete a rotation around its axis
    var neptuneAxisRotationSpeed = Calculations.deegreesToRadians(360)/neptuneAxisRotationalPeriod;
    //The speed of the orbit is 360 degrees divided by the time it takes to complete an orbit (Radians per second)
    var neptuneOrbitSpeed = Calculations.deegreesToRadians(360)/neptuneOrbitPeriod;

    neptuneOrbit.setPivotPoint(neptune_orbit_center);
    neptuneOrbit.translate(neptune_orbit_center,-1)
    neptuneOrbit.parent = sun;
    neptuneOrbit.rotation.z = Calculations.deegreesToRadians(1.769);
    neptuneOrbit.rotation.y = Calculations.deegreesToRadians(131.784);
    neptune.parent = neptuneOrbit
    neptuneOrbit.color = BABYLON.Color3.Green();

 
    localAxes.xAxis.parent = earth;
    localAxes.yAxis.parent = earth;
    localAxes.zAxis.parent = earth;

    sun.rotation.x = sunAxialTilt;
    mercury.rotation.x = mercuryAxialTilt;
    venus.rotation.x = venusAxialTilt;
    earth.rotation.x = earthAxialTilt;
    mars.rotation.x = marsAxialTilt;
    jupiter.rotation.x = jupiterAxialTilt;
    saturn.rotation.x = saturnAxialTilt;
    uranus.rotation.x = uranusAxialTilt;
    neptune.rotation.x = neptuneAxialTilt;



    var mercury_Movement_Speed = 0
    var venus_Movement_Speed = 0
    var earth_Movement_Speed = 0
    var mars_Movement_Speed = 0
    var jupiter_Movement_Speed = 0
    var saturn_Movement_Speed = 0
    var uranus_Movement_Speed = 0
    var neptune_Movement_Speed = 0
   

    
    scene.onBeforeRenderObservable.add(() => {

        var deltaTimeInsecs = (scene.getEngine().getDeltaTime()) / 1000;

        mercury_Movement_Speed = (mercury_Movement_Speed + 1) % (mercuryOrbitPoints.length - 1)
        venus_Movement_Speed = (venus_Movement_Speed + 1) % (venusOrbitPoints.length - 1)
        earth_Movement_Speed = (earth_Movement_Speed + 1) % (earthOrbitPoints.length - 1)
        mars_Movement_Speed = (mars_Movement_Speed + 1) % (marsOrbitPoints.length - 1)
        jupiter_Movement_Speed = (jupiter_Movement_Speed + 1) % (jupiterOrbitPoints.length - 1)
        saturn_Movement_Speed = (saturn_Movement_Speed + 1) % (saturnOrbitPoints.length - 1)
        uranus_Movement_Speed = (uranus_Movement_Speed + 1) % (uranusOrbitPoints.length - 1)
        neptune_Movement_Speed = (neptune_Movement_Speed + 1) % (neptuneOrbitPoints.length - 1)

        //orbit movement
        mercury.position = new BABYLON.Vector3(mercuryOrbitPoints[mercury_Movement_Speed].x,0,mercuryOrbitPoints[mercury_Movement_Speed].z)
        venus.position = new BABYLON.Vector3(venusOrbitPoints[venus_Movement_Speed].x,0,venusOrbitPoints[venus_Movement_Speed].z)
        earth.position = new BABYLON.Vector3(earthOrbitPoints[earth_Movement_Speed].x,0,earthOrbitPoints[earth_Movement_Speed].z)
        mars.position = new BABYLON.Vector3(marsOrbitPoints[mars_Movement_Speed].x,0,marsOrbitPoints[mars_Movement_Speed].z)
        jupiter.position = new BABYLON.Vector3(jupiterOrbitPoints[jupiter_Movement_Speed].x,0,jupiterOrbitPoints[jupiter_Movement_Speed].z)
        saturn.position = new BABYLON.Vector3(saturnOrbitPoints[saturn_Movement_Speed].x,0,saturnOrbitPoints[saturn_Movement_Speed].z)
        uranus.position = new BABYLON.Vector3(uranusOrbitPoints[uranus_Movement_Speed].x,0,uranusOrbitPoints[uranus_Movement_Speed].z)
        neptune.position = new BABYLON.Vector3(neptuneOrbitPoints[neptune_Movement_Speed].x,0,neptuneOrbitPoints[neptune_Movement_Speed].z)



        


        console.log("Mercurio:" + mercury_Movement_Speed)
        console.log("Venus:" + venus_Movement_Speed)
        /*console.log("Tierra:" + earth_Movement_Speed)
        console.log("Marte:" + mars_Movement_Speed)
        console.log("Jupiter:" + jupiter_Movement_Speed)
        console.log("Saturno:" + saturn_Movement_Speed)
        console.log("Urano:" + uranus_Movement_Speed)
        console.log("Neptuno:" + neptune_Movement_Speed)*/
        

        mercury_Movement_Speed += Math.floor(mercuryOrbitPeriod * deltaTimeInsecs * 0.00001)
        venus_Movement_Speed += Math.floor(venusOrbitPeriod * deltaTimeInsecs * 0.00001)
        earth_Movement_Speed += Math.floor(earthOrbitPeriod * deltaTimeInsecs * 0.00001)
        mars_Movement_Speed += Math.floor(marsOrbitPeriod * deltaTimeInsecs * 0.00001)
        jupiter_Movement_Speed += Math.floor(jupiterOrbitPeriod * deltaTimeInsecs * 0.00001)
        saturn_Movement_Speed += Math.floor(saturnOrbitPeriod * deltaTimeInsecs * 0.00001)
        uranus_Movement_Speed += Math.floor(uranusOrbitPeriod * deltaTimeInsecs * 0.00001)
        neptune_Movement_Speed += Math.floor(neptuneOrbitPeriod * deltaTimeInsecs * 0.00001)
        console.log()

        console.log(mercury_Movement_Speed)
        console.log(venus_Movement_Speed)

        
        

        //Local axis rotation
        mercury.rotate(BABYLON.Axis.Y, mercuryAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        venus.rotate(BABYLON.Axis.Y, venusAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        earth.rotate(BABYLON.Axis.Y, earthAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        mars.rotate(BABYLON.Axis.Y, marsAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        jupiter.rotate(BABYLON.Axis.Y, jupiterAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        saturn.rotate(BABYLON.Axis.Y, saturnAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        uranus.rotate(BABYLON.Axis.Y, uranusAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);
        neptune.rotate(BABYLON.Axis.Y, neptuneAxisRotationSpeed * deltaTimeInsecs, BABYLON.Space.LOCAL);


       
        
    
      })


};


function Tema() {
  return (
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Tema;