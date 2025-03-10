function deepEqual(actual, expected, path = '$') {

    if (typeof actual !== typeof expected) {
        throw new Error(`${path}`);
    }

    if (Array.isArray(actual) && Array.isArray(expected)) {
        if (actual.length !== expected.length) {
            throw new Error(`${path}`);
        }
        for (let i = 0; i < actual.length; i++) {
            deepEqual(actual[i], expected[i], `${path}[${i}]`);
        }
        return true;
    }

    if (typeof actual === 'object' && typeof expected === 'object') {
        const actualKeys = Object.keys(actual);
        const expectedKeys = Object.keys(expected);

        if (actualKeys.length !== expectedKeys.length) {
            throw new Error(`${path}`);
        }

        for (const key of actualKeys) {
            if (!expectedKeys.includes(key)) {
                throw new Error(`${path}`);
            }
            deepEqual(actual[key], expected[key], `${path}.${key}`);
        }
        return true;
    }

    if (actual !== expected) {
        throw new Error(`${path}`);
    }

    return true;
}

const obj1 = {
    a: {
        b: 1,
    },
};

const obj2 = {
    a: {
        b: 2,
    },
};

const obj3 = {
    a: {
        b: 1,
    },
};

try {
    deepEqual(obj1, obj1);
    console.log('OK');
} catch (error) {
    console.error(error.message);
}

try {
    deepEqual(obj1, obj2);
    console.log('OK');
} catch (error) {
    console.error(error.message);
}

try {
    deepEqual(obj1, obj3);
    console.log('OK');
} catch (error) {
    console.error(error.message);
}
