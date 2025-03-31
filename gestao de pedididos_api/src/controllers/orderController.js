const asyncHandler = require("express-async-handler");
const session = require("express-session");
const Order = require("../models/order");
const User = require("../models/User");
const sequelize = require("../config/db");
const AppError = require("../models/AppError");


//create order 
const createOrder = asyncHandler(async(req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,  
            userId: req.user.id
        })
        return res.json(newOrder);
    } catch (error) {
        throw new AppError(error, 400)
    }
})

const updateOrder = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { status, processado } = req.body;

    try {
        const [updated] = await Order.update(
            { status, 
              processado  
             }, 
            { where: { id } }
        );

        if (!updated) {
            throw new AppError("Pedido não encontrado.", 404)
        }

        return res.status(200).json({message: "pedido atualizado"});
    } catch (error) {
       throw new AppError(error, 400)
    }
})


const getOrderUser = asyncHandler(async(req, res) => {
    try {
        const userId = req.user.id
        const orders =  await Order.findAll({where: { userId }, order: [['createdAt', 'DESC']]});

        if (!orders || orders.length === 0) {
            console.log("nehum pedido")
            throw new AppError("Nenhum pedido encontrado para este usuário", 400)
        }

        return res.json({
            orders: orders.map(order => ({
                id: order.id,
                tipo: order.tipo,
                descricao: order.descricao,
                valor : order.valor,
                status : order.status,
                processado: order.processado,
                data: order.createdAt
            }))
        });
    } catch (error) {
        throw new Error()
    }
})


const getAllOrder = asyncHandler(async(req, res) => {
    try {
        const orders = await sequelize.query(
            `select orders.*, users.name as companyName from orders 
            join users on orders.userId = users.id 
            order by orders.createdAt desc`,
            {
              type: sequelize.QueryTypes.SELECT
            }
          );
        
        if (!orders || orders.length === 0) {
            throw new AppError("Nenhum pedido encontrado", 404)
        }
        return res.json({
            orders: orders.map(order => ({
            id: order.id,
            tipo: order.tipo,
            descricao: order.descricao,
            valor : order.valor,
            status : order.status,
            processado: order.processado,
            data: order.createdAt,
            companyName: order.companyName
            }))
        });
    } catch (error) {
        throw new Error()
    }
})


module.exports = {createOrder, updateOrder, getOrderUser, getAllOrder}