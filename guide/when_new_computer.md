# 새로운 컴퓨터일때 해야할일 

## npx tsx 자동 설정하게 하기( 이걸한후 해당 파일 창에서 오른쪽 클릭 > external tools > npx tsx 실행하면 자동으로 tsx 파일이 생성됨)

1. WebStorm 설정 열기:

File -> Settings (Windows/Linux) 또는 WebStorm -> Preferences (Mac)으로 이동합니다.

2. External Tools 설정:

Tools -> External Tools를 선택합니다.
오른쪽 패널에서 + 버튼을 클릭하여 새로운 External Tool을 추가합니다.

3. 새 External Tool 설정:

Name: 원하는 이름을 입력합니다. 예를 들어, "Run with npx tsx".
Description: 원하시는 설명을 입력합니다. 예: "Run the current file with npx tsx".
Program: npx 를 입력합니다.
Arguments: tsx $FilePathRelativeToProjectRoot$를 입력합니다.
Working directory: $ProjectFileDir$를 입력합니다.
4. 적용 및 완료:

OK를 클릭하여 설정을 저장합니다.
5. 파일에서 실행:

이제 특정 TypeScript 파일을 오른쪽 클릭하면 External Tools 메뉴에서 "Run with npx tsx"를 선택하여 해당 파일을 npx tsx로 실행할 수 있습니다.