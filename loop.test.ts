
import { exec } from 'child_process'
import path from 'path'
import { describe,test } from 'vitest'

const clInfoResult = () => { new Promise<null | {
    devices: {
      online: {
        CL_DEVICE_BOARD_NAME_AMD?: string
        /** we really shouldn't use this, but I can find another way on AMD cards */
        CL_DEVICE_GLOBAL_MEM_SIZE?: number
        CL_DEVICE_NAME: string
      }[]
    }[]
    platforms: string[]
  }>((res) => {
    exec(
      `"${path.join(__dirname, 'clinfo.exe')}" --json`,
      {},
      (error, stdout, stderr) => {
        if (error || stderr) {
            throw error
        }

        try {
          const jsonResponse = JSON.parse(stdout.trim())
          return res(jsonResponse)
        } catch (e) {
         throw e
        }
      },
    )
  })}

describe('loop', () => {
  test('loop', async () => {
    for (let i = 0; i < 100; i++) {
        const res = await clInfoResult()
    }
  })
})