const SpacecraftDB=require('../models').Spacecraft;

const express = require("express");


const controller = {
    addSpacecraft: async (req,res) => {
        const spacecraft = {
            name: req.body.name,
            maxSpeed:req.body.maxSpeed,
            mass:req.body.mass,
            astronautId:req.body.astronautId
        }
        let err = false;
        let errArr=[];

        if(spacecraft.name.length<=3) {
            err=true;
            errArr.push("Name must be at least 3 characters long\n");
        }
        if(spacecraft.maxSpeed<=1000) {
            err=true;
            errArr.push("Max speed must be more than 1000\n");

        }
        if(spacecraft.mass<=200) {
            err=true;
            errArr.push("Mass must be more than 200\n");

        }

        if(!err) {
            try {
                const newSpacecraft=await SpacecraftDB.create(spacecraft);
                res.status(200).send("Spacecraft added");
            }
            catch (error) {
                console.log('Error:',error);
                res.status(500).send("Error creating new spacecraft!");
            }
        }
        else {

            res.status(400).send({message:errArr})
        }
    },
    getAllSpacecrafts: async(req,res) => {
        try {
            let spacecrafts=await SpacecraftDB.findAll();
            res.status(200).send(spacecrafts);
        } catch(err){
            res.status(500).send({
                message: "Error selecting all spacecrafts!"
            })
        }
    },
    getOneSpacecraft: async(req, res) => {
        try{
            let spacecraftId = req.params['id'];
            const spacecraft = await SpacecraftDB.findOne({ where : { id: spacecraftId }});
            res.status(200).send(spacecraft);
        } catch(err){
            res.status(500).send({
                message: "Error selecting spacecraft!"
            })
        }
    },

    updateSpacecraft: async(req,res) => {
        let spacecraftId=req.params['id'];
        const spacecraft=await SpacecraftDB.findOne({where:{id:spacecraftId}});
        spacecraft.update({
            name:req.body.name,
            maxSpeed:req.body.maxSpeed,
            mass:req.body.mass,
            astronautId: req.body.astronautId
        })
            .then(() => {
                res.status(200).send({message:"Edited spacecraft"})
            })
            .catch(() => {
                res.status(500).send({message:"Error"})
            })
    },
    deleteSpacecraft : async(req,res) => {
        try{
            let spacecraftId = req.params['id'];
            const spacecraft = await SpacecraftDB.destroy({
                where: {
                    id: spacecraftId
                }
            })
            res.status(200).send({
                message: "spacecraft " + spacecraftId + " deleted."
            });
        }catch(error){
            res.status(500).send({
                message: "Error deleting spacecraft!"
            })
        }
    }

}

module.exports = controller;