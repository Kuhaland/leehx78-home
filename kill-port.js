import { exec } from 'child_process';
import { argv, exit } from 'process';

const port = argv[2] || 5173;

exec(`lsof -ti tcp:${port}`, (err, stdout) => {
  if (err) {
    console.error(`❌ 포트 ${port} 조회 실패`);
    exit(0);
  }

  if (stdout) {
    const pids = stdout.split('\n').filter(Boolean).join(' ');
    exec(`kill -9 ${pids}`, (killErr) => {
      if (killErr) {
        console.error(`❌ 프로세스 종료 실패: ${killErr.message}`);
      } else {
        console.log(`✅ 포트 ${port}의 프로세스 종료 완료`);
      }
    });
  } else {
    console.log(`ℹ️ 포트 ${port} 사용 중인 프로세스 없음`);
  }
});
