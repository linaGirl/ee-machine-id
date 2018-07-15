'use strict';


import os from 'os';
import hash from './hash';


export default function() {
    let machineIdString = '';


    // mac addresses
    const interfaces = os.networkInterfaces();
    const interfaceNames = Object.keys(interfaces);
    const macAddresses = new Set();

    for (const interfaceName of interfaceNames) {
        for (const iface of interfaces[interfaceName]) {
            macAddresses.add(iface.mac);
        }
    }
    
    machineIdString += [...macAddresses.values()].sort().join('/')+'|';


    // memory
    machineIdString += os.totalmem()+'|';


    // cpu info
    const cpuInfo = os.cpus();
    machineIdString += cpuInfo[0].model+'/'+cpuInfo.length;


    return hash(machineIdString);
}