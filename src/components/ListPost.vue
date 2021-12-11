<template>
    <div>
        <v-row v-for="(post, index) in post" :key="index"
            ><v-col md="6" offset-md="3" xl="4" offset-xl="4">
                <Post
                    :postid="post.postid"
                    :posttext="post.posttext"
                    :who="post.who"
                    :date="post.date"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Post from './Post'
export default {
    name: 'ListPost',
    components: {
        Post,
    },
    data: () => ({
        post: [
            {
                postid: '1',
                posttext:
                    'สวัสดีนักศึกษาที่ลงทำเบียนวิชาการสื่อสารไร้สายวันนี้เรามีเรียนเพื่อแนะนำรายวิชานะครับออยากให้นักศึกษาแอดเข้ากลุ่มไลน์ตามQRcodesนี้ครับ',
                who: 'ธนภัทร์ อนุศาสน์อมรกุล',
                date: '01/01/2021',
            },
            {
                postid: '2',
                posttext:
                    'ครับ สำหรับท่านที่เดินผ่านไปผ่านมานะครับ วันนี้ เฉาก๊วยชากังราวของเรานะครับ ก็ได้มาบริการท่านพ่อแม่พี่น้องกันอีกแล้วครับ อากาศร้อนๆ อย่างนี้นะครับ สำหรับท่านที่เดินผ่านไปผ่านมา ลองมาแวะชิมเฉาก๊วยแท้ๆ กันก่อนนะครับ เฉาก๊วยชากังราวของเราเป็นที่รู้จักไปทั่ว',
                who: 'เฉาก๊วยชากังราว',
                date: '01/01/2021',
            },
            {
                postid: '3',
                posttext: 'ยัยธารใส พรุ่งนี้ไอจะขยี้ยูให้แหลกคึ',
                who: 'ฟิลลิปส์',
                date: '01/01/2021',
            },
            { postid: '4', posttext: 'posttext', who: 'who', date: 'DATE' },
        ],
    }),
}
</script>

<style></style>
