const Service = require("../models/Service.model");
const User = require("../models/User.model");

//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createService = async (req, res, next) => {
    try {
        await Service.syncIndexes();

        /** hacemos una instancia del modelo  */
        const customBody = {
            description: req.body?.description,
            tags: req.body?.tags,
            offerer: req.body?.offerer
        };
        const newService = new Service(customBody);
        const savedService = await newService.save();

        // test en el runtime
        return res
            .status(savedService ? 200 : 404)
            .json(savedService ? savedService : "error al crear el servicio");
    } catch (error) {
        return res.status(404).json({
            error: "error catch create service",
            message: error.message,
        });
    }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);
        if (service) {
            // lo buscamos para vr si sigue existiendo o no
            const findByIdService = await Service.findById(id);

            try {
                const test = await Service.updateMany(
                    { service: id },
                    { $pull: { service: id } }
                );
                console.log(test);

                try {
                    await User.updateMany(//*------> actualizamos sus servicios favs o sus servicios?
                        { serviceFav: id },// todo: cambiar las variables del modelo de User
                        { $pull: { serviceFav: id } }
                    );

                    return res.status(findByIdService ? 404 : 200).json({
                        deleteTest: findByIdService ? false : true,
                    });
                } catch (error) {
                    return res.status(404).json({
                        error: "error catch update User",
                        message: error.message,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    error: "error catch update servicio",
                    message: error.message,
                });
            }
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by tag ---------------------------
//! ---------------------------------------------------------------------
const getByTag = async (req, res, next) => {
    try {
        const { tags } = req.params;
        const serviceByTag = await Service.findByTag(tags);
        if (serviceByTag) {
            return res.status(200).json(serviceByTag);
        } else {
            return res.status(404).json("no se ha encontrado el servicio");
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const serviceById = await Service.findById(id);
        if (serviceById) {
            return res.status(200).json(ServiceById);
        } else {
            return res.status(404).json("no se ha encontrado el servicio");
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const update = async (req, res, next) => {
    await Service.syncIndexes();
    //let catchImg = req.file?.path;-----> en servicio no habrá imágenes
    try {
        const { id } = req.params;
        const serviceById = await Service.findById(id);
        if (serviceById) {
            //const oldImg = characterById.image;

            const customBody = {
                _id: serviceById._id,
                //image: req.file?.path ? catchImg : oldImg,
                name: req.body?.name ? req.body?.name : serviceById.name,
            };

            /**if (req.body?.gender) {
              const resultEnum = enumOk(req.body?.gender);
              customBody.gender = resultEnum.check
                ? req.body?.gender
                : characterById.gender;
            }*/

            try {
                await Service.findByIdAndUpdate(id, customBody);
                /**if (req.file?.path) {
                  deleteImgCloudinary(oldImg);
                }*/

                //** ------------------------------------------------------------------- */
                //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
                //** ------------------------------------------------------------------- */

                // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

                const serviceByIdUpdate = await Service.findById(id);

                // ......> uso el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
                const elementUpdate = Object.keys(req.body);

                /** vamos a hacer un objeto vacio donde meteremos los test */

                let test = {};

                /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

                elementUpdate.forEach((item) => {
                    if (req.body[item] === serviceByIdUpdate[item]) {
                        test[item] = true;
                    } else {
                        test[item] = false;
                    }
                });

                /**if (catchImg) {
                  characterByIdUpdate.image === catchImg
                    ? (test = { ...test, file: true })
                    : (test = { ...test, file: false });
                }*/

                /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
                 * si no hay ningun false entonces lanzamos un 200 porque todo esta correctoo
                 */

                let acc = 0;
                for (clave in test) {
                    test[clave] == false && acc++;
                }

                if (acc > 0) {
                    return res.status(404).json({
                        dataTest: test,
                        update: false,
                    });
                } else {
                    return res.status(200).json({
                        dataTest: test,
                        update: true,
                    });
                }
            } catch (error) {
                return res.status(404).json({
                    error: "error catch update",
                    message: error.message
                })
            }
        } else {
            return res.status(404).json("este character no existe");
        }
    } catch (error) {
        return res.status(404).json(error);
    }
};


module.exports = {
    createService,
    deleteService,
    getByTag,
    getById,
    update
}