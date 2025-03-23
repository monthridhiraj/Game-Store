export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

export function setQueryParams(params) {
    const searchParams = new URLSearchParams(params);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
}

export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard', 'success');
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

export function isMobile() {
    return window.innerWidth <= 768;
}

export function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

export function isDesktop() {
    return window.innerWidth > 1024;
}

export function getDeviceType() {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
}

export function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = '/images/placeholder.png';
}

export function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

export function formatPercentage(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(number / 100);
}

export function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + ' years ago';
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + ' months ago';
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + ' days ago';
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + ' hours ago';
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
}

export function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}

export function getBrowserInfo() {
    const ua = navigator.userAgent;
    const browserInfo = {
        name: 'Unknown',
        version: 'Unknown',
        platform: 'Unknown'
    };

    if (ua.includes('Firefox/')) {
        browserInfo.name = 'Firefox';
        browserInfo.version = ua.match(/Firefox\/([0-9.]+)/)[1];
    } else if (ua.includes('Chrome/')) {
        browserInfo.name = 'Chrome';
        browserInfo.version = ua.match(/Chrome\/([0-9.]+)/)[1];
    } else if (ua.includes('Safari/')) {
        browserInfo.name = 'Safari';
        browserInfo.version = ua.match(/Version\/([0-9.]+)/)[1];
    } else if (ua.includes('Edge/')) {
        browserInfo.name = 'Edge';
        browserInfo.version = ua.match(/Edge\/([0-9.]+)/)[1];
    }

    if (ua.includes('Windows')) browserInfo.platform = 'Windows';
    else if (ua.includes('Mac')) browserInfo.platform = 'Mac';
    else if (ua.includes('Linux')) browserInfo.platform = 'Linux';
    else if (ua.includes('Android')) browserInfo.platform = 'Android';
    else if (ua.includes('iOS')) browserInfo.platform = 'iOS';

    return browserInfo;
}

export function getLocalStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    return total;
}

export function clearOldLocalStorage() {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (getLocalStorageSize() > maxSize) {
        localStorage.clear();
        showToast('Local storage cleared due to size limit', 'info');
    }
}

export function isOnline() {
    return navigator.onLine;
}

export function handleOffline() {
    window.addEventListener('online', () => {
        showToast('Back online!', 'success');
    });

    window.addEventListener('offline', () => {
        showToast('You are offline', 'error');
    });
}

export function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

export function scrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

export function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        width: rect.width,
        height: rect.height
    };
}

export function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function addResizeListener(callback) {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(callback, 250);
    });
}

export function addScrollListener(callback) {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(callback, 250);
    });
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function groupBy(array, key) {
    return array.reduce((result, item) => {
        (result[item[key]] = result[item[key]] || []).push(item);
        return result;
    }, {});
}

export function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size)
    );
}

export function unique(array) {
    return [...new Set(array)];
}

export function intersection(array1, array2) {
    return array1.filter(value => array2.includes(value));
}

export function difference(array1, array2) {
    return array1.filter(value => !array2.includes(value));
}

export function union(array1, array2) {
    return [...new Set([...array1, ...array2])];
}

export function sortBy(array, key) {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

export function sortByDesc(array, key) {
    return [...array].sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
    });
}

export function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

export function average(array) {
    return sum(array) / array.length;
}

export function median(array) {
    const sorted = [...array].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

export function mode(array) {
    const frequency = {};
    let maxFreq = 0;
    let mode;

    array.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFreq) {
            maxFreq = frequency[value];
            mode = value;
        }
    });

    return mode;
}

export function range(start, end, step = 1) {
    return Array.from(
        { length: Math.ceil((end - start) / step) },
        (_, i) => start + i * step
    );
}

export function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    return Array.from({ length: maxLength }, (_, i) =>
        arrays.map(arr => arr[i])
    );
}

export function unzip(array) {
    return array[0].map((_, i) => array.map(arr => arr[i]));
}

export function flatten(array) {
    return array.reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
        []
    );
}

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}

export function omit(obj, keys) {
    return Object.keys(obj)
        .filter(key => !keys.includes(key))
        .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
}

export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export function memoize(func) {
    const cache = new Map();
    return function executedFunction(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    };
}

export function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

export function compose(...functions) {
    return function(arg) {
        return functions.reduceRight((composed, f) => f(composed), arg);
    };
}

export function pipe(...functions) {
    return function(arg) {
        return functions.reduce((composed, f) => f(composed), arg);
    };
}

export function once(func) {
    let result;
    let called = false;
    return function executedFunction(...args) {
        if (!called) {
            result = func.apply(this, args);
            called = true;
        }
        return result;
    };
}

export function retry(func, retries = 3, delay = 1000) {
    return async function executedFunction(...args) {
        try {
            return await func.apply(this, args);
        } catch (error) {
            if (retries === 0) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
            return executedFunction(...args, retries - 1);
        }
    };
}

export function timeout(func, ms) {
    return function executedFunction(...args) {
        return Promise.race([
            func.apply(this, args),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), ms)
            )
        ]);
    };
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function randomInt(min, max) {
    return Math.floor(random(min, max));
}

export function randomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

export function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

export function randomArray(length, min, max) {
    return Array.from(
        { length },
        () => randomInt(min, max)
    );
}

export function randomObject(keys, min, max) {
    return keys.reduce((obj, key) => {
        obj[key] = randomInt(min, max);
        return obj;
    }, {});
}

export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function randomBoolean() {
    return Math.random() >= 0.5;
}

export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomElements(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export function randomWeighted(array, weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * total;
    for (let i = 0; i < array.length; i++) {
        random -= weights[i];
        if (random <= 0) return array[i];
    }
    return array[array.length - 1];
}

export function randomGaussian(mean = 0, stddev = 1) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stddev + mean;
}

export function randomExponential(lambda = 1) {
    return -Math.log(1 - Math.random()) / lambda;
}

export function randomPoisson(lambda = 1) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
        k++;
        p *= Math.random();
    } while (p > L);
    return k - 1;
}

export function randomBinomial(n, p) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        if (Math.random() < p) x++;
    }
    return x;
}

export function randomGeometric(p) {
    return Math.floor(Math.log(Math.random()) / Math.log(1 - p)) + 1;
}

export function randomHypergeometric(N, K, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        if (Math.random() < K / (N - i)) {
            x++;
            K--;
        }
    }
    return x;
}

export function randomNegativeBinomial(r, p) {
    let x = 0;
    let failures = 0;
    while (failures < r) {
        if (Math.random() < p) {
            failures++;
        } else {
            x++;
        }
    }
    return x;
}

export function randomWeibull(lambda = 1, k = 1) {
    return lambda * Math.pow(-Math.log(1 - Math.random()), 1/k);
}

export function randomGamma(shape, scale = 1) {
    if (shape < 1) {
        return randomGamma(shape + 1, scale) * Math.pow(Math.random(), 1/shape);
    }
    const d = shape - 1/3;
    const c = 1/Math.sqrt(9*d);
    while (true) {
        const x = randomGaussian();
        const v = Math.pow(1 + c*x, 3);
        if (v <= 0) continue;
        const u = Math.random();
        if (u < 1 - 0.331 * Math.pow(x, 2) ||
            Math.log(u) < 0.5 * x*x + d * (1 - v + Math.log(v))) {
            return scale * d * v;
        }
    }
}

export function randomBeta(alpha, beta) {
    const x = randomGamma(alpha);
    const y = randomGamma(beta);
    return x / (x + y);
}

export function randomDirichlet(alphas) {
    const gammas = alphas.map(alpha => randomGamma(alpha));
    const sum = gammas.reduce((a, b) => a + b, 0);
    return gammas.map(gamma => gamma / sum);
}

export function randomMultinomial(n, p) {
    const x = new Array(p.length).fill(0);
    let remaining = n;
    let sum = p.reduce((a, b) => a + b, 0);
    for (let i = 0; i < p.length - 1; i++) {
        x[i] = randomBinomial(remaining, p[i] / sum);
        remaining -= x[i];
        sum -= p[i];
    }
    x[p.length - 1] = remaining;
    return x;
}

export function randomCategorical(p) {
    const u = Math.random();
    let sum = 0;
    for (let i = 0; i < p.length; i++) {
        sum += p[i];
        if (u <= sum) return i;
    }
    return p.length - 1;
}

export function randomDiscrete(pmf) {
    const cdf = pmf.reduce((acc, p) => {
        acc.push((acc[acc.length - 1] || 0) + p);
        return acc;
    }, []);
    const u = Math.random();
    for (let i = 0; i < cdf.length; i++) {
        if (u <= cdf[i]) return i;
    }
    return cdf.length - 1;
}

export function randomContinuous(pdf, xmin, xmax, ymax) {
    while (true) {
        const x = random(xmin, xmax);
        const y = random(0, ymax);
        if (y <= pdf(x)) return x;
    }
}

export function randomMixture(components) {
    const weights = components.map(c => c.weight);
    const component = components[randomCategorical(weights)];
    return randomGaussian(component.mean, component.stddev);
}

export function randomMarkovChain(transitionMatrix, initialState) {
    let currentState = initialState;
    return function() {
        const row = transitionMatrix[currentState];
        currentState = randomCategorical(row);
        return currentState;
    };
}

export function randomHiddenMarkovModel(transitionMatrix, emissionMatrix, initialState) {
    let currentState = initialState;
    return function() {
        const row = transitionMatrix[currentState];
        currentState = randomCategorical(row);
        const emissionRow = emissionMatrix[currentState];
        return randomCategorical(emissionRow);
    };
}

export function randomBrownianMotion(dt = 0.01, sigma = 1) {
    let x = 0;
    return function() {
        x += randomGaussian(0, sigma * Math.sqrt(dt));
        return x;
    };
}

export function randomOrnsteinUhlenbeck(theta = 1, mu = 0, sigma = 1, dt = 0.01) {
    let x = mu;
    return function() {
        x += theta * (mu - x) * dt + sigma * randomGaussian(0, Math.sqrt(dt));
        return x;
    };
}

export function randomWienerProcess(dt = 0.01, sigma = 1) {
    let t = 0;
    let x = 0;
    return function() {
        t += dt;
        x += randomGaussian(0, sigma * Math.sqrt(dt));
        return { t, x };
    };
}

export function randomGeometricBrownianMotion(mu = 0, sigma = 1, dt = 0.01) {
    let x = 1;
    return function() {
        x *= Math.exp((mu - sigma * sigma / 2) * dt + sigma * randomGaussian(0, Math.sqrt(dt)));
        return x;
    };
}

export function randomJumpDiffusion(lambda = 1, mu = 0, sigma = 1, jumpSize = 1, dt = 0.01) {
    let x = 0;
    return function() {
        x += randomGaussian(mu * dt, sigma * Math.sqrt(dt));
        if (Math.random() < lambda * dt) {
            x += randomGaussian(0, jumpSize);
        }
        return x;
    };
}

export function randomStochasticVolatility(kappa = 1, theta = 1, xi = 1, rho = 0, dt = 0.01) {
    let v = theta;
    let x = 0;
    return function() {
        const dv = kappa * (theta - v) * dt + xi * Math.sqrt(v) * randomGaussian(0, Math.sqrt(dt));
        const dx = Math.sqrt(v) * (rho * randomGaussian(0, Math.sqrt(dt)) + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(dt)));
        v += dv;
        x += dx;
        return { v, x };
    };
}

export function randomHestonModel(kappa = 1, theta = 1, xi = 1, rho = 0, dt = 0.01) {
    let v = theta;
    let x = 0;
    return function() {
        const dv = kappa * (theta - v) * dt + xi * Math.sqrt(v) * randomGaussian(0, Math.sqrt(dt));
        const dx = -0.5 * v * dt + Math.sqrt(v) * (rho * randomGaussian(0, Math.sqrt(dt)) + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(dt)));
        v += dv;
        x += dx;
        return { v, x };
    };
}

export function randomCoxIngersollRoss(kappa = 1, theta = 1, sigma = 1, dt = 0.01) {
    let r = theta;
    return function() {
        r += kappa * (theta - r) * dt + sigma * Math.sqrt(r) * randomGaussian(0, Math.sqrt(dt));
        return r;
    };
}

export function randomVasicekModel(kappa = 1, theta = 1, sigma = 1, dt = 0.01) {
    let r = theta;
    return function() {
        r += kappa * (theta - r) * dt + sigma * randomGaussian(0, Math.sqrt(dt));
        return r;
    };
}

export function randomHullWhiteModel(kappa = 1, theta = 1, sigma = 1, dt = 0.01) {
    let r = theta;
    return function() {
        r += kappa * (theta - r) * dt + sigma * randomGaussian(0, Math.sqrt(dt));
        return r;
    };
}

export function randomBlackScholesModel(mu = 0, sigma = 1, dt = 0.01) {
    let S = 100;
    return function() {
        S *= Math.exp((mu - sigma * sigma / 2) * dt + sigma * randomGaussian(0, Math.sqrt(dt)));
        return S;
    };
}

export function randomMertonModel(mu = 0, sigma = 1, lambda = 1, jumpSize = 1, dt = 0.01) {
    let S = 100;
    return function() {
        S *= Math.exp((mu - sigma * sigma / 2) * dt + sigma * randomGaussian(0, Math.sqrt(dt)));
        if (Math.random() < lambda * dt) {
            S *= Math.exp(randomGaussian(0, jumpSize));
        }
        return S;
    };
}

export function randomKouModel(mu = 0, sigma = 1, lambda = 1, p = 0.5, eta1 = 1, eta2 = 1, dt = 0.01) {
    let S = 100;
    return function() {
        S *= Math.exp((mu - sigma * sigma / 2) * dt + sigma * randomGaussian(0, Math.sqrt(dt)));
        if (Math.random() < lambda * dt) {
            const jump = Math.random() < p ? randomExponential(eta1) : -randomExponential(eta2);
            S *= Math.exp(jump);
        }
        return S;
    };
}

export function randomBatesModel(kappa = 1, theta = 1, xi = 1, rho = 0, lambda = 1, jumpSize = 1, dt = 0.01) {
    let v = theta;
    let x = 0;
    return function() {
        const dv = kappa * (theta - v) * dt + xi * Math.sqrt(v) * randomGaussian(0, Math.sqrt(dt));
        const dx = -0.5 * v * dt + Math.sqrt(v) * (rho * randomGaussian(0, Math.sqrt(dt)) + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(dt)));
        v += dv;
        x += dx;
        if (Math.random() < lambda * dt) {
            x += randomGaussian(0, jumpSize);
        }
        return { v, x };
    };
}

export function randomSABRModel(alpha = 1, beta = 0.5, rho = 0, nu = 1, dt = 0.01) {
    let F = 100;
    let sigma = alpha;
    return function() {
        const dW1 = randomGaussian(0, Math.sqrt(dt));
        const dW2 = rho * dW1 + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(dt));
        F += sigma * Math.pow(F, beta) * dW1;
        sigma += nu * sigma * dW2;
        return { F, sigma };
    };
}

export function randomCEVModel(beta = 0.5, sigma = 1, dt = 0.01) {
    let S = 100;
    return function() {
        S += sigma * Math.pow(S, beta) * randomGaussian(0, Math.sqrt(dt));
        return S;
    };
}

export function randomGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomEGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, dt = 0.01) {
    let logSigma2 = Math.log(omega / (1 - beta));
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.exp(logSigma2 / 2));
        logSigma2 = omega + alpha * (Math.abs(epsilon) - Math.sqrt(2/Math.PI)) + gamma * epsilon + beta * logSigma2;
        x += epsilon;
        return { sigma2: Math.exp(logSigma2), x };
    };
}

export function randomTGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta - 0.5 * gamma);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + gamma * epsilon * epsilon * (epsilon < 0) + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomNGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * Math.pow(epsilon - gamma, 2) + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomIGARCHModel(alpha = 0.1, dt = 0.01) {
    let sigma2 = 0.0001;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = alpha * epsilon * epsilon + (1 - alpha) * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomFIGARCHModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * epsilon * epsilon;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomFIEGARCHModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, dt = 0.01) {
    let logSigma2 = Math.log(omega / (1 - beta));
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.exp(logSigma2 / 2));
        logSigma2 = omega + (1 - beta) * logSigma2 + (alpha - beta) * (Math.abs(epsilon) - Math.sqrt(2/Math.PI)) + gamma * epsilon;
        x += epsilon;
        return { sigma2: Math.exp(logSigma2), x };
    };
}

export function randomFIAPARCHModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, delta = 1.5, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * Math.pow(Math.abs(epsilon) - gamma * epsilon, delta);
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomHYGARCHModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, a = 1, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * epsilon * epsilon;
        sigma2 = a * sigma2 + (1 - a) * Math.pow(sigma2, d);
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomCGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + beta * (sigma2 - qt);
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomRealizedVolatilityModel(omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const realizedVol = epsilon * epsilon;
        sigma2 = omega + alpha * realizedVol + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomRangeVolatilityModel(omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const range = Math.abs(epsilon);
        sigma2 = omega + alpha * range + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomComponentGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + beta * (sigma2 - qt);
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomAsymmetricComponentGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, gamma = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + gamma * (epsilon * epsilon - qt) * (epsilon < 0) + beta * (sigma2 - qt);
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomThresholdGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, threshold = 0, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + gamma * epsilon * epsilon * (epsilon < threshold) + beta * sigma2;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomSmoothTransitionGARCHModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, c = 0, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const transition = 1 / (1 + Math.exp(-gamma * (epsilon - c)));
        sigma2 = omega + alpha * epsilon * epsilon + beta * sigma2 + gamma * epsilon * epsilon * transition;
        x += epsilon;
        return { sigma2, x };
    };
}

export function randomMarkovSwitchingGARCHModel(omega = [0.0001, 0.0002], alpha = [0.1, 0.2], beta = [0.8, 0.7], transitionMatrix = [[0.95, 0.05], [0.05, 0.95]], dt = 0.01) {
    let sigma2 = omega[0] / (1 - alpha[0] - beta[0]);
    let x = 0;
    let state = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const row = transitionMatrix[state];
        state = randomCategorical(row);
        sigma2 = omega[state] + alpha[state] * epsilon * epsilon + beta[state] * sigma2;
        x += epsilon;
        return { sigma2, x, state };
    };
}

export function randomRegimeSwitchingGARCHModel(omega = [0.0001, 0.0002], alpha = [0.1, 0.2], beta = [0.8, 0.7], gamma = [0.1, 0.2], transitionMatrix = [[0.95, 0.05], [0.05, 0.95]], dt = 0.01) {
    let sigma2 = omega[0] / (1 - alpha[0] - beta[0]);
    let x = 0;
    let state = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const row = transitionMatrix[state];
        state = randomCategorical(row);
        sigma2 = omega[state] + alpha[state] * epsilon * epsilon + gamma[state] * epsilon * epsilon * (epsilon < 0) + beta[state] * sigma2;
        x += epsilon;
        return { sigma2, x, state };
    };
}

export function randomDynamicConditionalCorrelationModel(omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    let y = 0;
    let rho = 0;
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        rho = (omega + alpha * epsilon1 * epsilon2 + beta * rho) / Math.sqrt(sigma2 * sigma2);
        x += epsilon1;
        y += epsilon2;
        return { sigma2, x, y, rho };
    };
}

export function randomConstantConditionalCorrelationModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.5, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    let y = 0;
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = rho * epsilon1 + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        x += epsilon1;
        y += epsilon2;
        return { sigma2, x, y, rho };
    };
}

export function randomBEKKModel(A = [[0.1, 0], [0, 0.1]], B = [[0.8, 0], [0, 0.8]], C = [[0.0001, 0], [0, 0.0001]], dt = 0.01) {
    let H = [[0.0001, 0], [0, 0.0001]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        const H_new = matrixAdd(
            matrixMultiply(C, matrixTranspose(C)),
            matrixMultiply(matrixMultiply(A, [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply(B, H), matrixTranspose(B))
        );
        H = H_new;
        x = [x[0] + epsilon[0] * Math.sqrt(H[0][0]), x[1] + epsilon[1] * Math.sqrt(H[1][1])];
        return { H, x };
    };
}

export function randomDCCModel(omega = 0.0001, alpha = 0.1, beta = 0.8, dt = 0.01) {
    let Q = [[1, 0], [0, 1]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        Q = matrixAdd(
            matrixMultiply([[omega, 0], [0, omega]], [[1 - alpha - beta, 0], [0, 1 - alpha - beta]]),
            matrixMultiply(matrixMultiply([[alpha, 0], [0, alpha]], [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply([[beta, 0], [0, beta]], Q), matrixTranspose(Q))
        );
        const D = [[1/Math.sqrt(Q[0][0]), 0], [0, 1/Math.sqrt(Q[1][1])]];
        const R = matrixMultiply(matrixMultiply(D, Q), D);
        x = [x[0] + epsilon[0], x[1] + epsilon[1]];
        return { Q, R, x };
    };
}

export function randomCCCModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.5, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = [0, 0];
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = rho * epsilon1 + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        x = [x[0] + epsilon1, x[1] + epsilon2];
        return { sigma2, x, rho };
    };
}

export function randomVECModel(A = [[0.1, 0], [0, 0.1]], B = [[0.8, 0], [0, 0.8]], C = [[0.0001, 0], [0, 0.0001]], dt = 0.01) {
    let H = [[0.0001, 0], [0, 0.0001]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        const H_new = matrixAdd(
            matrixMultiply(C, matrixTranspose(C)),
            matrixMultiply(matrixMultiply(A, [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply(B, H), matrixTranspose(B))
        );
        H = H_new;
        x = [x[0] + epsilon[0] * Math.sqrt(H[0][0]), x[1] + epsilon[1] * Math.sqrt(H[1][1])];
        return { H, x };
    };
}

export function randomGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomEGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, lambda = 0.1, dt = 0.01) {
    let logSigma2 = Math.log(omega / (1 - beta));
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.exp(logSigma2 / 2));
        logSigma2 = omega + alpha * (Math.abs(epsilon) - Math.sqrt(2/Math.PI)) + gamma * epsilon + beta * logSigma2;
        x += lambda * Math.exp(logSigma2 / 2) + epsilon;
        return { sigma2: Math.exp(logSigma2), x };
    };
}

export function randomTGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta - 0.5 * gamma);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + gamma * epsilon * epsilon * (epsilon < 0) + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomNGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * Math.pow(epsilon - gamma, 2) + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomIGARCHinMeanModel(alpha = 0.1, lambda = 0.1, dt = 0.01) {
    let sigma2 = 0.0001;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = alpha * epsilon * epsilon + (1 - alpha) * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomFIGARCHinMeanModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * epsilon * epsilon;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomFIEGARCHinMeanModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, lambda = 0.1, dt = 0.01) {
    let logSigma2 = Math.log(omega / (1 - beta));
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.exp(logSigma2 / 2));
        logSigma2 = omega + (1 - beta) * logSigma2 + (alpha - beta) * (Math.abs(epsilon) - Math.sqrt(2/Math.PI)) + gamma * epsilon;
        x += lambda * Math.exp(logSigma2 / 2) + epsilon;
        return { sigma2: Math.exp(logSigma2), x };
    };
}

export function randomFIAPARCHinMeanModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, delta = 1.5, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * Math.pow(Math.abs(epsilon) - gamma * epsilon, delta);
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomHYGARCHinMeanModel(d = 0.5, omega = 0.0001, alpha = 0.1, beta = 0.8, a = 1, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + (1 - beta) * sigma2 + (alpha - beta) * epsilon * epsilon;
        sigma2 = a * sigma2 + (1 - a) * Math.pow(sigma2, d);
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomCGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + beta * (sigma2 - qt);
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomRealizedVolatilityinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const realizedVol = epsilon * epsilon;
        sigma2 = omega + alpha * realizedVol + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomRangeVolatilityinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const range = Math.abs(epsilon);
        sigma2 = omega + alpha * range + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomComponentGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + beta * (sigma2 - qt);
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomAsymmetricComponentGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.99, phi = 0.01, gamma = 0.1, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let qt = sigma2;
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        qt = rho * qt + phi * (epsilon * epsilon - sigma2);
        sigma2 = qt + alpha * (epsilon * epsilon - qt) + gamma * (epsilon * epsilon - qt) * (epsilon < 0) + beta * (sigma2 - qt);
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomThresholdGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, threshold = 0, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon * epsilon + gamma * epsilon * epsilon * (epsilon < threshold) + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomSmoothTransitionGARCHinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, gamma = 0.1, c = 0, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const transition = 1 / (1 + Math.exp(-gamma * (epsilon - c)));
        sigma2 = omega + alpha * epsilon * epsilon + beta * sigma2 + gamma * epsilon * epsilon * transition;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x };
    };
}

export function randomMarkovSwitchingGARCHinMeanModel(omega = [0.0001, 0.0002], alpha = [0.1, 0.2], beta = [0.8, 0.7], transitionMatrix = [[0.95, 0.05], [0.05, 0.95]], lambda = 0.1, dt = 0.01) {
    let sigma2 = omega[0] / (1 - alpha[0] - beta[0]);
    let x = 0;
    let state = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const row = transitionMatrix[state];
        state = randomCategorical(row);
        sigma2 = omega[state] + alpha[state] * epsilon * epsilon + beta[state] * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x, state };
    };
}

export function randomRegimeSwitchingGARCHinMeanModel(omega = [0.0001, 0.0002], alpha = [0.1, 0.2], beta = [0.8, 0.7], gamma = [0.1, 0.2], transitionMatrix = [[0.95, 0.05], [0.05, 0.95]], lambda = 0.1, dt = 0.01) {
    let sigma2 = omega[0] / (1 - alpha[0] - beta[0]);
    let x = 0;
    let state = 0;
    return function() {
        const epsilon = randomGaussian(0, Math.sqrt(sigma2));
        const row = transitionMatrix[state];
        state = randomCategorical(row);
        sigma2 = omega[state] + alpha[state] * epsilon * epsilon + gamma[state] * epsilon * epsilon * (epsilon < 0) + beta[state] * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon;
        return { sigma2, x, state };
    };
}

export function randomDynamicConditionalCorrelationinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    let y = 0;
    let rho = 0;
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        rho = (omega + alpha * epsilon1 * epsilon2 + beta * rho) / Math.sqrt(sigma2 * sigma2);
        x += lambda * Math.sqrt(sigma2) + epsilon1;
        y += lambda * Math.sqrt(sigma2) + epsilon2;
        return { sigma2, x, y, rho };
    };
}

export function randomConstantConditionalCorrelationinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.5, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = 0;
    let y = 0;
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = rho * epsilon1 + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        x += lambda * Math.sqrt(sigma2) + epsilon1;
        y += lambda * Math.sqrt(sigma2) + epsilon2;
        return { sigma2, x, y, rho };
    };
}

export function randomBEKKinMeanModel(A = [[0.1, 0], [0, 0.1]], B = [[0.8, 0], [0, 0.8]], C = [[0.0001, 0], [0, 0.0001]], lambda = 0.1, dt = 0.01) {
    let H = [[0.0001, 0], [0, 0.0001]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        const H_new = matrixAdd(
            matrixMultiply(C, matrixTranspose(C)),
            matrixMultiply(matrixMultiply(A, [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply(B, H), matrixTranspose(B))
        );
        H = H_new;
        x = [
            x[0] + lambda * Math.sqrt(H[0][0]) + epsilon[0] * Math.sqrt(H[0][0]),
            x[1] + lambda * Math.sqrt(H[1][1]) + epsilon[1] * Math.sqrt(H[1][1])
        ];
        return { H, x };
    };
}

export function randomDCCinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, lambda = 0.1, dt = 0.01) {
    let Q = [[1, 0], [0, 1]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        Q = matrixAdd(
            matrixMultiply([[omega, 0], [0, omega]], [[1 - alpha - beta, 0], [0, 1 - alpha - beta]]),
            matrixMultiply(matrixMultiply([[alpha, 0], [0, alpha]], [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply([[beta, 0], [0, beta]], Q), matrixTranspose(Q))
        );
        const D = [[1/Math.sqrt(Q[0][0]), 0], [0, 1/Math.sqrt(Q[1][1])]];
        const R = matrixMultiply(matrixMultiply(D, Q), D);
        x = [
            x[0] + lambda * Math.sqrt(Q[0][0]) + epsilon[0],
            x[1] + lambda * Math.sqrt(Q[1][1]) + epsilon[1]
        ];
        return { Q, R, x };
    };
}

export function randomCCCinMeanModel(omega = 0.0001, alpha = 0.1, beta = 0.8, rho = 0.5, lambda = 0.1, dt = 0.01) {
    let sigma2 = omega / (1 - alpha - beta);
    let x = [0, 0];
    return function() {
        const epsilon1 = randomGaussian(0, Math.sqrt(sigma2));
        const epsilon2 = rho * epsilon1 + Math.sqrt(1 - rho * rho) * randomGaussian(0, Math.sqrt(sigma2));
        sigma2 = omega + alpha * epsilon1 * epsilon1 + beta * sigma2;
        x = [
            x[0] + lambda * Math.sqrt(sigma2) + epsilon1,
            x[1] + lambda * Math.sqrt(sigma2) + epsilon2
        ];
        return { sigma2, x, rho };
    };
}

export function randomVECinMeanModel(A = [[0.1, 0], [0, 0.1]], B = [[0.8, 0], [0, 0.8]], C = [[0.0001, 0], [0, 0.0001]], lambda = 0.1, dt = 0.01) {
    let H = [[0.0001, 0], [0, 0.0001]];
    let x = [0, 0];
    return function() {
        const epsilon = [randomGaussian(0, 1), randomGaussian(0, 1)];
        const H_new = matrixAdd(
            matrixMultiply(C, matrixTranspose(C)),
            matrixMultiply(matrixMultiply(A, [epsilon]), matrixTranspose([epsilon])),
            matrixMultiply(matrixMultiply(B, H), matrixTranspose(B))
        );
        H = H_new;
        x = [
            x[0] + lambda * Math.sqrt(H[0][0]) + epsilon[0] * Math.sqrt(H[0][0]),
            x[1] + lambda * Math.sqrt(H[1][1]) + epsilon[1] * Math.sqrt(H[1][1])
        ];
        return { H, x };
    };
}

// Matrix operations
function matrixAdd(...matrices) {
    return matrices.reduce((result, matrix) => {
        return result.map((row, i) => {
            return row.map((val, j) => val + matrix[i][j]);
        });
    });
}

function matrixMultiply(matrix1, matrix2) {
    const result = Array(matrix1.length).fill().map(() => Array(matrix2[0].length).fill(0));
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    return result;
}

function matrixTranspose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
} 