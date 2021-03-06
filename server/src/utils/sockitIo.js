import socketIo from 'socket.io';
import config from '../config/index.js';
import redis from './redis.js';
import { artilceInfo } from './redisToMysql.js';
let draftPostRedisKey = config.draftPostRedisKey;
const initSocket = function (server) {
    let socketHandle = socketIo(server, {
        serveClient: true
    });
    
    let draftRedis = new redis(config.redis);
    socketHandle.on('connection', function (socket) {
        console.log('socket connected');

        // 离开编辑文章页面
        socket.on('disconnect', function () {
            console.info('[%s] DISCONNECTED', socket.sid);
        });

        // 进入新增文章页面，获取已保存的草稿（可以为空）
        socket.on('getDraftPost', async function (id) {
            let data = await draftRedis.get(draftPostRedisKey);
            if (!data) {
                data = await artilceInfo.getDraftPostFromMysql(id);
                socket.emit('getDraftPost', data);
                await draftRedis.set(draftPostRedisKey, data);
            } else {
                socket.emit('getDraftPost', data);
            }
        });

        // 实时保存文章内容
        socket.on('saveDraftPost', async function (data) {
            console.log(data);
            let res = await draftRedis.set(draftPostRedisKey, data);
            socket.emit('saveDraftPost', res);
        });

        // 保存后清空已保存的文章草稿
        socket.on('clearDraftPost', async function () {
            await draftRedis.delete(draftPostRedisKey);
            // await redisMysql.clearDraftPostOfMysql();
            socket.emit('clearDraftPost', true);
        });
    });
}

export default initSocket;