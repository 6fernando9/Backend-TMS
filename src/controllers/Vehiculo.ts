// controller/vehiculo.controller.ts

import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";

export const registrarVehiculo = async (req: Request, res: Response,next:NextFunction) => {
  
    const {
      placa,
      tipoVehiculoId,
      peso,
      estado,
      kilometraje,
      choferId
    } = req.body;

    const nuevoVehiculo = await prismaClient.vehiculo.create({
      data: {
        placa,
        peso,
        estado,
        kilometraje,
        tipoVehiculoId,
        choferId
      }
    });

    res.json(nuevoVehiculo);
  
};

export const getVehiculo = async (req: Request, res: Response, next: NextFunction) => {
  const vehiculo = prismaClient.vehiculo.findMany();
  res.json(vehiculo);
};


export const getTipoVehiculo = async (req:Request,res:Response,next:NextFunction)=>{
    
    const tipos=await prismaClient.tipoVehiculo.findMany();
    res.json(tipos)

  }

  export const createTipoVehiculo = async (req:Request,res:Response,next:NextFunction)=>{
    const {nombre} =  req.body
    const tipos=await prismaClient.tipoVehiculo.create({
      data:{
        nombre 
      }
    })
    res.json(tipos)

  }