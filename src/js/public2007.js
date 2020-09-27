//1.获取随机数
const rannum = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//2.获取任意的css值+缓冲运动
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr]
    }
}

function bufferMove(obj, json, fn) {
    let speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        let flag = true;
        for (let attr in json) {
            var currentValue = null;
            if (attr === 'opacity') {
                currentValue = Math.round(getStyle(obj, attr) * 100);
            } else {
                currentValue = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - currentValue) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (currentValue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (currentValue + speed) / 100;
                } else {
                    obj.style[attr] = currentValue + speed + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn();
        }
    }, 1000 / 60);
}



//4.封装函数实现ajax数据的获取和传输。
//将对象转换成&符号拼接的字符串
function objToString(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        let arr = [];
        for (let i in obj) {
            arr.push(i + '=' + obj[i])
        }
        return arr.join('&')
    }
}

function ajax(option) {
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        option.type = option.type || 'get';
        if (!option.url) {
            throw new Error('接口地址不能为空');
        }
        if (option.data && Object.prototype.toString.call(option.data) === '[object Object]') {
            option.data = objToString(option.data);
        }

        if (option.data && option.type === 'get') {
            option.url += '?' + option.data;
        }

        if (option.async === 'false' || option.async === false) {
            option.async = false
        } else {
            option.async = true
        }
        ajax.open(option.type, option.url, option.async);

        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }

        if (option.async) {
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(ajax.responseText);
                    } else {
                        reject('接口地址有误')
                    }
                }
            };
        } else {
            if (ajax.status === 200) {
                resolve(ajax.responseText);
            } else {
                reject('接口地址有误')
            }
        }

    });
    return promise;
}

//5.封装操作cookie方法。
//命名空间
let cookie = {
    set: function(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${date};path=/`;
    },
    get: function(key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    },
    remove: function(key) {
        this.set(key, '', -1);
    }
};