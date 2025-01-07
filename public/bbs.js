"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

// lllllllllllll

document.addEventListener("DOMContentLoaded", () => {
    loadPosts(); // ページ読み込み時に投稿をロード
});

function loadPosts(start = 0) {
    const params = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `start=${start}`,
    };
    fetch("/read", params)
        .then((response) => response.json())
        .then((response) => {
            response.messages.forEach((post, id) => renderPost(post, start + id));
            number += response.messages.length; // 読み込んだ投稿の数を更新
        });
}

// 投稿表示時にいいねボタンを追加
function renderPost(post, id) {
    let cover = document.createElement("div");
    cover.className = "cover";

    let nameArea = document.createElement("span");
    nameArea.className = "name";
    nameArea.innerText = post.name;

    let messageArea = document.createElement("span");
    messageArea.className = "mes";
    messageArea.innerText = post.message;

    let likeButton = document.createElement("button");
    likeButton.innerText = `👍 ${post.likes || 0}`;
    likeButton.addEventListener("click", () => {
        fetch("/like", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`,
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    likeButton.innerText = `👍 ${response.likes}`;
                }
            });
    });

    cover.appendChild(nameArea);
    cover.appendChild(messageArea);
    cover.appendChild(likeButton);

    bbs.appendChild(cover);
}

// 検索機能
document.querySelector("#search").addEventListener("click", () => {
    const keyword = document.querySelector("#searchInput").value;
    fetch("/search", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `keyword=${keyword}`,
    })
        .then((response) => response.json())
        .then((response) => {
            bbs.innerHTML = "";
            response.results.forEach((post, id) => renderPost(post, id));
        });
});

// 通知機能
let lastCheckedNumber = 0;

setInterval(() => {
    fetch("/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
        .then((response) => response.json())
        .then((response) => {
            const newPostsCount = response.number - lastCheckedNumber;
            if (newPostsCount > 0) {
                alert(`新しい投稿が ${newPostsCount} 件あります！`);
                lastCheckedNumber = response.number; // 確認済みに更新
            }
        });
}, 5000);

document.querySelector("#check button").addEventListener("click", () => {
    const start = number; // 現在表示している投稿数
    loadPosts(start);
});