// 获取已拥有皮肤，默认 ['🐕']
const mySkinArr = JSON.parse(localStorage.getItem('arr')) || ['🐕']

// 商店皮肤及价格（点券）
const skinArr = [
    {emoji: '🐕', cost: 1000, sound: 'audio/dog.mp3'},
    {emoji: '🐖', cost: 1300, sound: 'audio/pig.mp3'},
    {emoji: '🐩', cost: 4700, sound: 'audio/dog.mp3'},
    {emoji: '🐇', cost: 2400, sound: 'audio/rabbit.mp3'},
    {emoji: '🐎', cost: 5800, sound: 'audio/horse.mp3'},
    {emoji: '🦌', cost: 2700, sound: 'audio/deer.mp3'},
    {emoji: '🐂', cost: 3400, sound: 'audio/ox.mp3'},
    {emoji: '🐅', cost: 7400, sound: 'audio/tiger.mp3'},
    {emoji: '🐆', cost: 8600, sound: 'audio/leopard.mp3'},
    {emoji: '🐒', cost: 3000, sound: 'audio/monkey.mp3'},
    {emoji: '🐑', cost: 2500, sound: 'audio/sheep.mp3'},
    {emoji: '🐿️', cost: 1800, sound: 'audio/squirrel.mp3'},
    {emoji: '🐈', cost: 2200, sound: 'audio/cat.mp3'},
    {emoji: '🦏', cost: 7000, sound: 'audio/ox.mp3'},
    {emoji: '🐘', cost: 6800, sound: 'audio/elephant.mp3'},
    {emoji: '🪼', cost: 4000, sound: 'audio/jellyfish.mp3'},
    {emoji: '🦨', cost: 3200, sound: 'audio/skunk.mp3'},
    {emoji: '🦈', cost: 7500, sound: 'audio/huge-water.mp3'},
    {emoji: '🦒', cost: 5400, sound: 'audio/rApache.mp3'},
    {emoji: '🦔', cost: 2500, sound: 'audio/hedgehog.mp3'},
    {emoji: '🐍', cost: 2900, sound: 'audio/snake.mp3'},
    {emoji: '🦉', cost: 1800, sound: 'audio/bird.mp3'},
    {emoji: '🦕', cost: 9000, sound: 'audio/Wanlong.mp3'},
    {emoji: '🦖', cost: 9800, sound: 'audio/t-rex.mp3'}
];

// 皮肤配置表
const skinConfig = {
    '🪼': {background: 'img/ocean.jpg', fontSize: '150px'},
    '🦖': {background: 'img/forest.jpg', fontSize: '250px'},
    '🦕': {background: 'img/forest.jpg', fontSize: '250px'},
    '🐘': {background: 'img/forest.jpg', fontSize: '250px'},
    '🦒': {background: 'img/forest.jpg', fontSize: '250px'},
    '🦈': {background: 'img/ocean.jpg', fontSize: '250px'},
    'default': {background: 'img/forest.jpg', fontSize: '150px'},
};

// 页面元素
const main = document.querySelector('.region main')              // 主区
const mainItem = main.children                                   // 主区模块
const list = document.querySelector('.list')                     // 左侧菜单
const topList = document.querySelector('.top-up-list')           // 点券充值
const substanceList = document.querySelector('.substance-list')  // 金币/钻石兑换
const gold = document.querySelector('.gold')                     // 黄金
const diamond = document.querySelector('.diamond')               // 钻石
const point = document.querySelector('.point')                   // 点券
const skinTap = document.querySelector('.skin-tap')               // 皮肤标签切换
const skinLists = document.querySelector('.skin-lists')           // 皮肤列表容器
const mySkinItem = skinLists.children                            // 我的/商店皮肤列表
const skinList = document.querySelector('.skin-list')             // 商店皮肤
const mySkin = document.querySelector('.my-skin')                 // 我的皮肤
const animalBox = document.querySelector('.animal-box')           // 动物框
const animal = document.querySelector('.animal')                  // 当前皮肤
const dockItem = document.querySelectorAll('.dock section')       // 底部 dock 内容
const footerItem = document.querySelectorAll('footer button')     // 底部按钮
const strengthenBtn = document.querySelector('.strengthen-btn')   // 强化按钮
const advancedBtn = document.querySelector('.advanced-btn')       // 进阶按钮
const rankStrengthen = document.querySelector('.rank-strengthen') // 强化等级
const rankAdvanced = rankStrengthen.nextElementSibling            // 进阶等级
const life = document.querySelector('.life')                      // 生命值
const attack = life.nextElementSibling                            // 攻击力
const strengthen = document.querySelector('.strengthen-region p') // 强化信息
const advanced = document.querySelector('.advanced-region p')     // 进阶信息
const materialGold = document.querySelector('.material-gold')     // 强化黄金需求
const materialDiamond = document.querySelector('.material-diamond') // 进阶钻石需求
const failRate = document.querySelector('.fail-rate')             // 成功率
const value = document.querySelector('.value')                    // 身价

// 存数据到 localStorage
const setStockpile = (uname, item) => localStorage.setItem(uname, JSON.stringify(item))
// 取数据，没数据返回默认值
const getStockpile = (uname, defaultValue = null) => {
    try {
        const data = JSON.parse(localStorage.getItem(uname))
        return data === null ? defaultValue : data
    } catch {
        return defaultValue
    }
}

// 提取数字
const getNumber = text => {
    const match = text.match(/\d+/)
    return match ? Number(match[0]) : 0
}

// 基础属性
const baseHP = 100
const baseATK = 50
const baseValue = 5

// 从本地或页面获取资源/等级
let pointNum = getStockpile('game-point') || getNumber(point.textContent);
let goldNum = getStockpile('game-gold') || getNumber(gold.textContent);
let diamondNum = getStockpile('game-diamond') || getNumber(diamond.textContent);
let nowGrade = getStockpile('game-grade') || getNumber(rankStrengthen.textContent);
let nowDegree = getStockpile('game-degree') || getNumber(rankAdvanced.textContent);
animal.textContent = getStockpile('game-animal') || mySkinArr[0]
animalBox.style.backgroundImage = getStockpile('game-environment') || 'url("img/forest.jpg")'
animal.style.fontSize = getStockpile('game-animalSize') || '150px'

// 初始化显示
gold.textContent = `🧈 黄金: ${goldNum}`
diamond.textContent = `💎 钻石: ${diamondNum}`
point.textContent = `📜 点卷: ${pointNum}`
rankStrengthen.textContent = `等级: ${nowGrade}`
rankAdvanced.textContent = `进阶: ${nowDegree}`

// 强化费用公式（n=等级）
const strengthenCost = n => Math.floor(100 * n ** 2 + 200)
// 进阶费用公式（k=次数）
const advancedCost = k => Math.floor(500 * (1.25 ** k))
// 进阶失败率公式（最高95%）
const advancedFailRate = level => Math.min(1 - Math.pow(0.95, ++level), 0.95)
// 获取当前成功率（%）
const getNowRate = degree => ((1 - advancedFailRate(degree)) * 100).toFixed(2)

// 计算属性（固定增长率+二次增长）
const getStatsFixed = (baseHP, baseATK, rate, level) => {
    const hp = Math.floor(baseHP * (1 + rate * level + 0.05 * level ** 2));
    const atk = Math.floor(baseATK * (1 + rate * level + 0.05 * level ** 2));
    return {hp, atk};
}

// 计算身价（进阶+20%/级）
const getAdvancedValue = (baseValue, advancedLevel) => {
    const advancedRate = 10
    return Math.floor(baseValue * (1 + advancedRate * advancedLevel))
}

// 刷新强化信息
const strengthenUpdate = () => {
    strengthen.textContent = `${nowGrade} 级 ➞ ${nowGrade + 1} 级`
    const nowCost = strengthenCost(nowGrade)
    materialGold.textContent = `🧈 ${nowCost}`
    const statsFixed = getStatsFixed(baseHP, baseATK, 0.1, nowGrade)
    if (statsFixed.hp > 10000) {
        statsFixed.hp = (statsFixed.hp / 10000).toFixed(2) + ' 万'
    }
    if (statsFixed.atk > 10000) {
        statsFixed.atk = (statsFixed.atk / 10000).toFixed(2) + ' 万'
    }
    life.textContent = `生命力: ${statsFixed.hp}`
    attack.textContent = `攻击力: ${statsFixed.atk}`
}

// 刷新进阶信息
const advancedUpdate = () => {
    advanced.textContent = `${nowDegree} 阶 ➞ ${nowDegree + 1} 阶`
    const nowCost = advancedCost(nowDegree)
    materialDiamond.textContent = `💎 ${nowCost}`
    failRate.textContent = `成功率: ${getNowRate(nowDegree)}%`
    const nowValue = getAdvancedValue(baseValue, nowDegree)
    value.textContent = `身价: ${nowValue} 万`
    strengthenUpdate()
}

// 防抖处理
const debounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 渲染商店皮肤
const renderSkinList = () => {
    skinList.innerHTML = skinArr.map(({emoji, cost}) => {
        const owned = mySkinArr.includes(emoji)
        return `
            <li class="my-skin-li" data-id="${emoji}" data-price="${cost}">
                ${emoji}
                <button class="skin-li-btn ${owned ? 'li-font-active' : ''}" ${owned ? 'disabled' : ''}>
                    ${owned ? '已拥有' : `📜${cost}`}
                </button>
            </li>
        `
    }).join('')
}

// 更新“我的皮肤”按钮状态
const handleMySkin = () => {
    const mySkinBtn = document.querySelectorAll('.my-skin-btn')
    mySkinBtn.forEach((btn, index) => {
        const skin = mySkinArr[index]
        if (skin === animal.textContent) {
            btn.classList.add('btn-font-active')
            btn.innerHTML = '使用中'
        } else {
            btn.classList.remove('btn-font-active')
            btn.innerHTML = '更换'
        }
    })
}

// 渲染我的皮肤
const createMySkin = () => {
    mySkin.innerHTML = mySkinArr.map(item => {
        return `
            <li class="my-skin-li" data-id="${item}">
                ${item}
                <button class="my-skin-btn">更换</button>
            </li>
        `
    }).join('')
}

// 初始化
const init = () => {
    advancedUpdate()
    strengthenUpdate()
    createMySkin()
    renderSkinList()
    handleMySkin()
}
init()

// 左侧菜单切换
list.addEventListener('click', e => {
    const {tagName, dataset} = e.target
    if (tagName !== 'LI') return
    [...footerItem].forEach((_, index) => dockItem[index].classList.add('footer-active'))
    document.querySelector('.font-active').classList.remove('font-active')
    e.target.classList.add('font-active');
    [...mainItem].forEach(item => item.classList.add('region-active'))
    mainItem[dataset.id].classList.remove('region-active');
})

// 点券充值
topList.addEventListener('click', e => {
    const {tagName, parentNode} = e.target
    if (tagName !== 'BUTTON') return

    if (!getStockpile('pet-verse-UniPay-user')) {
        alert('请先绑定你的UniPay账户')
        const uniPayUname = String(prompt('输入UniPay的用户名'))
        const uniPayPassword = String(prompt('输入UniPay的登录密码'))
        if (!getStockpile(`UniPay-${uniPayUname}-user`)) {
            alert('用户名输入错误')
            return;
        }
        if (String(uniPayPassword) !== String(getStockpile(`UniPay-${uniPayUname}-user`).password)) {
            alert('支付密码错误')
            return;
        }
        setStockpile('pet-verse-UniPay-user', uniPayUname)

    }

    const payPassword = prompt('输入UniPay的支付密码')
    const uniPayCurrent = getStockpile(`UniPay-${getStockpile('pet-verse-UniPay-user')}-user`)
    const {payPassword: word} = uniPayCurrent
    const US = +e.target.textContent.split('$')[1]

    if (String(payPassword) !== String(word)) {
        alert('支付密码错误')
        return;
    } else if (uniPayCurrent.balance < US) {
        if (confirm('余额不足是否要前往UniPay?')) {
            location.href = 'https://ethanwilliams7500.github.io/uni-pay/public/index.html'
        }
        return;
    } else {
        alert('支付成功')
        uniPayCurrent.balance -= US
        setStockpile(`UniPay-${getStockpile('pet-verse-UniPay-user')}-user`, uniPayCurrent)
    }

    const num = +parentNode.dataset.point
    point.innerHTML = `📜 点卷: ${pointNum += num}`

    setStockpile('game-point', pointNum)
})

// 黄金/钻石兑换
substanceList.addEventListener('click', e => {
    const {tagName, dataset, parentNode} = e.target
    if (tagName !== 'BUTTON') return
    if (!confirm('确认要购买吗？')) return

    const num = +parentNode.dataset.num
    const price = +parentNode.dataset.point
    if (pointNum < price) return alert('你的点券不足')
    point.innerHTML = `📜 点卷: ${pointNum -= price}`
    setStockpile('game-point', pointNum)

    const owned = dataset.id === 'gold'

    owned ? gold.textContent = `🧈 黄金: ${goldNum += num}` : diamond.innerHTML = `💎 钻石: ${diamondNum += num}`
    owned ? setStockpile('game-gold', goldNum) : setStockpile('game-diamond', diamondNum)
})

// 皮肤标签切换
skinTap.addEventListener('click', e => {
    const {tagName, dataset} = e.target
    if (tagName !== 'SPAN') return
    document.querySelector('.skin-font-active').classList.remove('skin-font-active')
    e.target.classList.add('skin-font-active');
    [...mySkinItem].forEach(item => item.classList.add('skin-active'))
    mySkinItem[dataset.id].classList.remove('skin-active')
})

// 购买皮肤
skinList.addEventListener('click', e => {
    const {tagName, parentNode} = e.target
    if (tagName !== 'BUTTON') return
    if (!confirm('确认要购买此皮肤吗？')) return
    const num = +parentNode.dataset.price

    if (pointNum < num) return alert('你的点券不足')
    point.innerHTML = `📜 点卷: ${pointNum -= num}`
    setStockpile('game-point', pointNum)
    mySkinArr.push(parentNode.dataset.id)

    setStockpile('arr', mySkinArr)
    init()
})

// 更换皮肤
mySkin.addEventListener('click', e => {
    const {tagName, parentNode} = e.target
    if (tagName !== 'BUTTON') return
    const selectedSkin = parentNode.dataset.id
    console.log(selectedSkin)
    animal.textContent = selectedSkin

    const {background, fontSize} = skinConfig[selectedSkin] || skinConfig.default
    animalBox.style.backgroundImage = `url(${background})`
    animal.style.fontSize = fontSize

    document.querySelector('.btn-font-active').classList.remove('btn-font-active')
    setStockpile('game-animal', selectedSkin)
    setStockpile('game-environment', animalBox.style.backgroundImage)
    setStockpile('game-animalSize', animal.style.fontSize)
    handleMySkin()
});

// 关闭 dock
[...dockItem].forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.textContent !== 'X') return
        item.classList.add('footer-active')
    })
});

// 底部按钮切换
[...footerItem].forEach((item, index) => {
    item.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return
        [...footerItem].forEach((_, index) => dockItem[index].classList.add('footer-active'))
        dockItem[index].classList.remove('footer-active')
    })
})

// 强化
strengthenBtn.addEventListener('click', () => {
    const cost = getNumber(materialGold.textContent)
    if (goldNum < cost) return alert('材料不足')
    alert('强化成功')
    gold.textContent = `🧈 黄金: ${goldNum -= cost}`
    setStockpile('game-gold', goldNum)
    rankStrengthen.textContent = `等级: ${++nowGrade}`
    setStockpile('game-grade', nowGrade)
    strengthenUpdate()
})

// 进阶
advancedBtn.addEventListener('click', () => {
    const cost = getNumber(materialDiamond.textContent)
    if (diamondNum < cost) return alert('材料不足')
    const random = Math.random()
    const nowRate = getNowRate(nowDegree) / 100
    if (random <= nowRate) {
        alert('进阶成功')
        nowDegree++
    } else {
        alert('进阶失败')
        nowDegree = Math.max(0, --nowDegree)
    }
    rankAdvanced.textContent = `进阶: ${nowDegree}`
    diamond.textContent = `💎 钻石: ${diamondNum -= cost}`
    setStockpile('game-diamond', diamondNum)
    setStockpile('game-degree', nowDegree)
    advancedUpdate()
});

// 动物叫声
animal.addEventListener('click', debounce(e => {
    const clickedEmoji = e.target.textContent.trim();
    const skin = skinArr.find(s => s.emoji === clickedEmoji);

    if (!skin) return console.warn('没有找到对应的音频:', clickedEmoji);

    const audio = new Audio(skin.sound);
    audio.currentTime = 0;
    audio.play().catch(err => console.warn('播放被阻止或失败：', err))
}, 500));
