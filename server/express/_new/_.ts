import express, {Request, Response} from 'express';

async function main() {
    console.log("Starting server...");

    // Express 애플리케이션 생성
    const app = express();

    // 간단한 라우트 설정
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World!');
    });

    // /hello/:name 라우트 설정
    app.get('/hello/:name', (req: Request, res: Response) => {
            const name = req.params.name;
            res.send(`Hello, ${name}!`);
        }
    );

    // test 라우트 설정
    app.get('/test', (req: Request, res: Response) => {
        res.send('Test!');
    });

    // 서버 포트 설정
    const port = 3020;

    // 서버 리스닝 시작
    await new Promise<void>((resolve, reject) => {
        const server = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
            resolve();
        });

        server.on('error', (err) => {
            reject(err);
        });
    });
}

// 에러 핸들링과 서버 시작
main().catch(err => {
    console.error('Server failed to start:', err);
    process.exit(1);
});

export {};
