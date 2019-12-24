import request from '@/utils/request'

// [{key, display_name}, ...]
export function getDict (dictID) {
    return request({
        url: '/dict',
        method: 'post',
        params: { dictID }
    })
}
