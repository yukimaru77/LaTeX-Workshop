import * as fs from 'fs'
import * as path from 'path'

/**
 * ======== 基本データ構造定義 (簡易版) ========
 * 元のLaTeX Workshopの型を簡略化しています。
 */
type DependencyRaw = { name: string; if?: string }
type EnvironmentRaw = { name: string; arg?: any; if?: string }
type MacroRaw = { name: string; arg?: any; detail?: string; doc?: string; if?: string }
type PackageRaw = {
  deps: DependencyRaw[]
  macros: MacroRaw[]
  envs: EnvironmentRaw[]
  keys: Record<string, string[]>
  args: string[]
}

/**
 * ======== コア関数群 ========
 */
function parsePkg(cwlPath: string): PackageRaw {
  if (!fs.existsSync(cwlPath)) throw new Error(`Input file not found: ${cwlPath}`)
  const content = fs.readFileSync(cwlPath, 'utf-8')
  const pkg: PackageRaw = { deps: [], macros: [], envs: [], keys: {}, args: [] }

  // 行単位で簡単に処理（CWL構文をシンプルに反映）
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (line === '' || line.startsWith('#')) continue
    if (line.startsWith('\\')) {
      const name = line.slice(1).split(/[{\[#]/)[0]
      pkg.macros.push({ name })
    } else if (line.startsWith('\\begin{')) {
      const env = line.match(/\\begin{([^}]+)}/)
      if (env) pkg.envs.push({ name: env[1] })
    } else if (line.startsWith('#include')) {
      const dep = line.split(' ')[1]
      if (dep) pkg.deps.push({ name: dep })
    }
  }

  return pkg
}

function parseFiles(files: string[], outDir: string) {
  fs.mkdirSync(outDir, { recursive: true })
  for (const f of files) {
    console.log(`Parsing: ${f}`)
    const pkg = parsePkg(f)
    const outName = path.basename(f).replace(/\.cwl$/, '.json')
    const outPath = path.join(outDir, outName)
    fs.writeFileSync(outPath, JSON.stringify(pkg, null, 2))
    console.log(`→ ${outPath}`)
  }
}

/**
 * ======== CLI引数処理 ========
 */
const args = process.argv.slice(2)
if (args.includes('--in')) {
  const inIdx = args.indexOf('--in')
  const outIdx = args.indexOf('--out')
  const outdirIdx = args.indexOf('--outdir')

  // 入力CWL一覧
  const inputs: string[] = []
  for (let i = inIdx + 1; i < args.length; i++) {
    const a = args[i]
    if (['--out', '--outdir'].includes(a)) break
    inputs.push(a)
  }
  if (inputs.length === 0) {
    console.error('❌ Error: No input after --in')
    process.exit(1)
  }

  // 単一ファイル出力
  if (inputs.length === 1 && outIdx !== -1) {
    const outPath = args[outIdx + 1]
    if (!outPath) {
      console.error('❌ Error: --out <output.json> is missing')
      process.exit(1)
    }
    const pkg = parsePkg(inputs[0])
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify(pkg, null, 2))
    console.log(`✅ Wrote ${outPath}`)
    process.exit(0)
  }

  // 複数ファイル出力
  if (inputs.length > 0 && outdirIdx !== -1) {
    const outDir = args[outdirIdx + 1]
    if (!outDir) {
      console.error('❌ Error: --outdir <dir> is missing')
      process.exit(1)
    }
    parseFiles(inputs, outDir)
    process.exit(0)
  }

  console.error('❌ Error: specify --out <file.json> or --outdir <dir>')
  process.exit(1)
} else {
  console.log('Usage:')
  console.log('  ts-node parse-cwl.ts --in file.cwl --out file.json')
  console.log('  ts-node parse-cwl.ts --in a.cwl b.cwl --outdir /path/to/outdir')
  process.exit(0)
}
