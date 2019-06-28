'use strict';

import machineId from '../src/machineId.mjs';
import section from 'section-tests';
import assert from 'assert';


section('MachineId', (section) => {

    section.test('Get ID', async() => {
        const id = machineId();
        assert(id);
    });
});