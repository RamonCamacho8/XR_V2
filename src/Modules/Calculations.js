import * as BABYLON from "babylonjs";

export var periphelion = function (semiMajorAxis, eccentricity) {
    return semiMajorAxis * (1 - eccentricity);
}

export var aphelion = function (semiMajorAxis, eccentricity) {
    return semiMajorAxis * (1 + eccentricity);
}

export var semiMinorAxis = function (semiMajorAxis, eccentricity) {
    return Math.sqrt(semiMajorAxis * semiMajorAxis * (1 - eccentricity * eccentricity));
}

export var pointsOnEllipse = function (semiMajorAxis, eccentricity, totalPoints) {
    
    var ellipse_points = [];
    var deltaTheta = Math.PI / totalPoints;
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaTheta) {
        var x = semiMajorAxis * Math.cos(theta);
        var y = semiMinorAxis(semiMajorAxis, eccentricity) * Math.sin(theta);
        ellipse_points.push(new BABYLON.Vector3(x, 0, y));
    }
    ellipse_points.push(ellipse_points[0]);
    return ellipse_points;
}

export var deegreesToRadians = function (degrees) {
    return degrees * Math.PI / 180;
}