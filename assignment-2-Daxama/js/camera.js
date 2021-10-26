'use strict'

import { orthographicProjectionMatrix, perspectiveProjectionMatrix } from "./matrix.js"
import SceneNode from "./scenenode.js"
//import {unproject} from "./raycaster.js"

class Camera extends SceneNode
{
    // TODO implement a camera base class

    constructor(position, lookat, up, fov, aspect, projMatrix = mat4.create(), vMat = mat4.create())
    {
        super( )
        this.projMatrix = projMatrix
        this.position = position
        this.lookat = lookat
        this.up = up
        this.fov = fov
        this.aspect = aspect
        this.vMat = vMat
        mat4.lookAt(vMat, position, lookat, up)//view matrix
    }

    update( )
    {

        super.update( )

    }

}

class PerspectiveCamera extends Camera
{
    constructor(position, lookat, up, fov, aspect, near, far)
    {
        const projMatrix = new perspectiveProjectionMatrix(fov, aspect, near, far)
        super(position, lookat, up, fov, aspect, projMatrix)
    }
    // TODO implement a perspective camera

}

class OrthographicCamera extends Camera
{
    constructor(rect, near, far)
    {
        const projMatrix = new orthographicProjectionMatrix(rect, near, far)
        super(position, lookat, up, fov, aspect, projMatrix)
    }
    // TODO implement an orthographic camera

}

class FpsCamera extends Camera
{

    // TODO implement an fps camera
    // THIS MODE IS OPTIONAL

}

export
{

    PerspectiveCamera,
    OrthographicCamera,
    FpsCamera

}
