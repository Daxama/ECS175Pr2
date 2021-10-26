'use strict'

// TODO implement these and other potentially missing matrix functions here
// The below functions are just two examples you'll definitely need to implement
// A complete example function is given above

/**
 * Gives the perspective camera projection matrix
 * @returns { Array.<Number> } The perspective camera projection matrix as a list
 */
function perspectiveProjectionMatrix(fov, aspect, near, far )
{
    let prMatrix = mat4.create()
    let btmTan = Math.tan(fov/2)
    prMatrix = mat4.fromValues(1/(aspect*btmTan), 0, 0, 0, 
    0, 1/btmTan, 0, 0, 
    0, 0, (-near -far)/(near-far), (2*far*near)/(near-far),
    0, 0, 1, 0)
    console.log(prMatrix)
        
    return prMatrix

}

/**
 * Gives the orthographic camera projection matrix
 * @returns { Array.<Number> } The orthographic camera projection matrix as a list
 */
function orthographicProjectionMatrix( rect, near, far)
{
    let prOMatrix = mat4.create()
    prOMatrix = mat4.fromValues(2/(rect.right - rect.left), 0, 0, (rect.left - rect.right)/(rect.right - rect.left),
    0, 2/(rect.top - rect.bottom), 0, (rect.bottom - rect.top)/(rect.top - rect.bottom), 
    0, 0, -2/(far - near), (near - far)/(far - near),
    0, 0, 0, 1)
    return prOMatrix

}

export
{
    perspectiveProjectionMatrix,
    orthographicProjectionMatrix
}
