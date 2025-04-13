// controller/vehiculo.controller.ts

import { Request, Response } from "express";
import { prismaClient } from "..";

export const registrarVehiculo = async (req: Request, res: Response) => {
  try {
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

    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getVehiculo=async (req:Request,res:Response)=>{
    try {
        const vehiculo=prismaClient.vehiculo.findMany();
        res.status(200).json(vehiculo)
    } catch (error) {
    res.status(500).json({ error });
        
    }
}


export const getTipoVehiculo= async (req:Request,res:Response)=>{
    try {
      const tipos=await prismaClient.tipoVehiculo.findMany();
      res.status(200).json(tipos)
    } catch (error) {
      res.status(500).json({error})
    }
  }